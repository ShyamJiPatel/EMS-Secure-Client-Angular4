import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userFirstName: string;

  constructor(private authService: AuthService, private router: Router) {
    this.userFirstName = authService.getUserName();
  }

  isLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false;
  }

  doLogout() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  clearToken($event) {
    this.authService.logout();
  }
}
