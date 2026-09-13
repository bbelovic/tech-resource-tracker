import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }
}
