import { Component, OnInit } from '@angular/core';
import { LoginCredential } from '../../model/auth/login-credential';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredential: LoginCredential = new LoginCredential();

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  doLogin() {
    if (this.loginCredential) {
      this.authService.login(this.loginCredential);
      this.toastr.success('You have Logged in successfully.', "Login");
    } else {
      this.toastr.error('You have not Logged in.', "Login Failed");
    }
  }

}
