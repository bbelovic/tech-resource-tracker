import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout() 
  }
}
