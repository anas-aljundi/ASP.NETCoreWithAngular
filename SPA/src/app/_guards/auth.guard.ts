import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertfiyService } from '../_services/alertfiy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private alertify: AlertfiyService) {}

  canActivate(): boolean  {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alertify.error('You shall not pass!!! please Log In');
    this.router.navigate(['/home']);
    return false;
  }
}
