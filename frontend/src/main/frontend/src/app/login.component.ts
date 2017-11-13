import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from './authentication-service';
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor ( private authenticationService: AuthenticationService,
        private router: Router) {}

    login(username: string, password: string): void {
        this.authenticationService.login(username, password)
            .then(res => this.router.navigateByUrl('/tech-resource'));
    }
}