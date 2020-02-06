import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protect',
  templateUrl: './protect.component.html',
  styleUrls: ['./protect.component.scss']
})
export class ProtectComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('access_token'));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
