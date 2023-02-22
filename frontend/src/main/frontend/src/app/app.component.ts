import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  brand = 'Tech resource tracker';

  authenticated: boolean = false; 

  constructor(public authService: AuthService) {}

  login(): void {
      this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  async ngOnInit() {
    this.authenticated = await this.authService.handleLogin();
    this.authService.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.authenticated = isAuthenticated
    );
  }
}
