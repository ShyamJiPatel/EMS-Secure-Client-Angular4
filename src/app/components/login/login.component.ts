import { Component, OnInit } from '@angular/core';
import { LoginCredential } from '../../model/auth/login-credential';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredential: LoginCredential = new LoginCredential();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    if (this.loginCredential) {
      this.authService.login(this.loginCredential);
    } else {
      console.log("Invalid username or password");
    }
  }

}
