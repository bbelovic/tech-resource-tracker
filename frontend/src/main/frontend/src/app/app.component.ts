import { Component } from '@angular/core';

import {Router} from '@angular/router';
import { AuthenticationService } from './authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  brand = 'Tech resource tracker';

  constructor(private router: Router,
    private authService: AuthenticationService) {}

  login(username: string, password: string): void {
      this.authService.login(username, password)
          .then(() => this.router.navigateByUrl('/tech-resources'));
  }

  logout(): void {
    this.authService.logout().then(() => this.router.navigateByUrl('/tech-resources'));
  }

}
