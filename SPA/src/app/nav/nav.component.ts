import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertfiyService } from '../_services/alertfiy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public auth: AuthService, private alertify: AlertfiyService,
              private router: Router) { }

  ngOnInit() {
    this.auth.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertify.success('Logged Successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.auth.decodedToken = null;
    this.auth.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
