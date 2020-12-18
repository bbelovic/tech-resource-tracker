import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService,  private router: Router) { }

  ngOnInit() {
  }

  login(username: string, passwd: string) {
    this.authService.login(username, passwd)
    .then(() => this.router.navigateByUrl('/tech-resources'));
  }

}
