import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class MainComponent implements OnInit {

  authenticated = new BehaviorSubject<boolean>(false);
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authenticated = this.authService.$authenticationState;
    this.authService.handleLogin().then(res => console.log(`Authenticated... ${res}`));    
  }
}
