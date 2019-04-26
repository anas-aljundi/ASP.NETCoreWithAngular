import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertfiyService } from '../_services/alertfiy.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public auth: AuthService, private alertify: AlertfiyService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertify.success('Logged Successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
