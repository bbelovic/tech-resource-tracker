import { Component } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  brand = 'Tech resource tracker';

  authenticated: boolean = false; 

  constructor(private router: Router,
    public authService: AuthService) {}

  login(): void {
      this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  async onInit() {
    this.authenticated = await this.authService.isAuthenticated();
    this.authService.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.authenticated = isAuthenticated
    );
  }
}
