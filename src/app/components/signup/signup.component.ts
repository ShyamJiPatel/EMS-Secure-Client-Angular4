import { Component, OnInit } from '@angular/core';
import { User } from '../../model/signup/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private serverURL = environment.API_URL;

  user: User = new User();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  doSignup() {
    if (this.user) {
      // check for password match
      if (this.user.password.toString() != this.user.repassword.toString()) {
        console.log("Password not matched.")
        return;
      }

      this.http.post(this.serverURL + "signup", this.user).subscribe(
        (result) => {
          if (result == null) {
            console.log("Error occured during signup");
            return;
          }
          this.user = new User();
        },
        (error) => {
          console.log("Error occured during signup" + error);
        });
    }
  }

}
