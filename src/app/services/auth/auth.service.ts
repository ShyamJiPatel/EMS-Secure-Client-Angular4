import { Injectable } from '@angular/core';
import { AuthToken } from '../../model/auth/auth-token';
import { LoginCredential } from '../../model/auth/login-credential';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const TOKEN_NAME = "ems-auth-token";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverURL = environment.API_URL + "token/generate-token";

  constructor(private http: HttpClient) {
  }

  public login(loginCredential: LoginCredential): boolean {
    this.http.post(this.serverURL, loginCredential).subscribe(
      res => {
        console.log(res);
        let token: any = res;
        this.saveToken(token);
        return true;
      },
      err => {
        console.log("Error occured during login");
        return false;
      }
    );
    return true;
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
    return authToken.token;
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
}
