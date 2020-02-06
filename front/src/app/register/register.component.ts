import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public username: string;
  public password: string;
  public password_conf: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {

    this.auth.register(this.username, this.password, this.password_conf).then((data) => {
      console.log(data);
      this.error = JSON.stringify(data);
    });

  }

}
