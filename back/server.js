'use strict';

const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mysql      = require('mysql');

var db = mysql.createPool({
    host     : 'binome-mysql',
    user     : 'admin',
    port     : '3306',
    password : 'binome',
    database : 'binome'
});


// App
const app = express();
var port = process.env.PORT || 3000;
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set morgan to log info about our requests for development use.
app.use(morgan('dev'));


// Enable cors
app.use(cors({
  origin: ["http://localhost:4200"],
  credentials: true,
  methods: ["GET", "POST"] 
  })
);


// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'session_id',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000}
}));




app.post('/api/auth', function(req, res) {
  const body = req.body;
  console.log(body.username);
  console.log(body.password);

  db.query("SELECT id, password FROM `User` WHERE username = ?", [body.username], function(err, rows) {
    if(err) {
      console.log("Pas d'user trouvé");
      return res.sendStatus(401);
    } else {
      rows = JSON.parse(JSON.stringify(rows));
        console.log(rows);
        var password ="";
        var id = "";
        rows.forEach(element => {
          console.log(element);
          password = element.password ;
        });
        console.log(password);
        if(password == body.password)
        {
          console.log("identifiants ok");
          var token = jwt.sign({userID: id}, 'super-secret-of-the-dead', {expiresIn: '2h'});
          res.send({token});
        }else{
          console.log("mot de passe incorrect"); 
          return res.sendStatus(401);
        }
    }
    
  });  
  
});

app.post('/api/register', function(req, res) {
  const body = req.body;

  db.query("SELECT * FROM User",function(err, result){

    result = JSON.parse(JSON.stringify(result));

    let compteur = 0;
    
    result.forEach(element => {
      if(element.username == req.body.username){
        console.log("user deja existant");
        res.json('Utilisateur déjà enregistré');
        compteur++ ;
      }
    });
    if(compteur == 0){
      if(req.body.password == req.body.confirmation){
        db.query("INSERT INTO `User`(username, password) VALUES(?, ?)",[body.username, body.password], function(err, result) {
          if(err) console.log("Erreur INSERT:"+err);
          console.log('incription réussie');
          res.json('incription réussie');
        });
        
      }else{
        console.log("Mot de passe et confirmation différentes");
        res.json('Mot de passe et confirmation différentes');
      }
    }

  });

});


app.get('/api/get_token', function (req, res) {
  try {
      res.json(req.session.user);
  } catch(err) {
      res.sendStatus(500);
  }
});


app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  const all_routes = require('express-list-endpoints');
  console.log(all_routes(app));
});
