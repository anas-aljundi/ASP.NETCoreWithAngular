import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertfiyService } from '../_services/alertfiy.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /* @Input() valuesFromHome: any;*/
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private auth: AuthService, private router: Router, private alertify: AlertfiyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      UserName: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.auth.register(this.user).subscribe(() => {
        this.alertify.success('Registration Successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.auth.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
