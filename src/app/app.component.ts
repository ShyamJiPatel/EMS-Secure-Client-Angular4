import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  isLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false;
  }

  doLogout() {
    if (this.authService.logout()) {
      this.toastr.success("You have successfully logged out.", "Logout")
      this.router.navigate(['/login']);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  clearToken($event) {
    $event.returnValue = "Are you sure?";
    this.authService.logout();
  }
}
