import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import {TechResource} from './tech-resource';
import {Router} from '@angular/router';
import {TechResourceService} from './tech-resource-service';
import { AuthenticationService } from './authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  brand = 'Tech resource tracker';

  constructor(private resourceService: TechResourceService,
    private httpClient: HttpClient, private router: Router, 
    private authService: AuthenticationService) {}

  login(username: string, password: string): void {
      this.authService.login(username, password)
          .then(res => this.router.navigateByUrl('/tech-resource'));
  }

  logout(): void {
    this.authService.logout().then(obj => this.router.navigateByUrl('/tech-resource'));
  }

}
