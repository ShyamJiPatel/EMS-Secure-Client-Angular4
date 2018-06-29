import { Injectable } from '@angular/core';
import { AuthToken } from '../../model/auth/auth-token';
import { LoginCredential } from '../../model/auth/login-credential';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const TOKEN_NAME = "ems-auth-token";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverURL = environment.API_URL + "token/generate-token";

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  public login(loginCredential: LoginCredential): void {
    this.http.post(this.serverURL, loginCredential).subscribe(
      res => {
        console.log(res);
        let token: any = res;
        this.saveToken(token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.toastr.error("Error occured during login", "Error");
      }
    );
  }

  public logout(): boolean {
    this.deleteToken();
    return true;
  }

  private saveToken(authToken: AuthToken): void {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(authToken));
  }

  public getToken(): string {
    let authToken = JSON.parse(localStorage.getItem(TOKEN_NAME));
    if (authToken) {
      return authToken.token;
    }
    return null;
  }

  private deleteToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getUserName(): string {
    if (this.isAuthenticated) {
      let authToken = JSON.parse(localStorage.getItem(TOKEN_NAME));
      if (authToken) {
        return authToken.sub;
      } else {
        return null;
      }
    }
  }
}
