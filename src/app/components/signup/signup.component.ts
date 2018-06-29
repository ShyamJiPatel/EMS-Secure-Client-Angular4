import { Component, OnInit } from '@angular/core';
import { User } from '../../model/signup/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private serverURL = environment.API_URL;

  user: User = new User();

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  doSignup() {
    if (this.user) {
      // check for password match
      if (this.user.password.toString() != this.user.repassword.toString()) {
        this.toastr.error("Password must be matched with Re-enter Password.", "Password Unmatched");
        return;
      }

      this.http.post(this.serverURL + "signup", this.user).subscribe(
        (result) => {
          if (result == null) {
            this.toastr.error("Error occured during signup.", "Error");
            return;
          }
          this.toastr.success("You have signed up successfully.", "Error");
          this.user = new User();
          this.router.navigate(['']);
        },
        (error) => {
          this.toastr.error("Error occured during signup.", "Error");
        });
    }
  }

}
