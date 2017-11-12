import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService} from './authentication-service';
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor (private httpClient: HttpClient, 
        private authenticationService: AuthenticationService,
        private router: Router) {

    }

    login(username: string, password: string): void {
        let authHeader: HttpHeaders = new HttpHeaders()
            .set('Authorization', 'Basic ' + btoa(username + ':' + password));
        this.httpClient.get('user', {headers: authHeader})
            .toPromise()
            .then(res => {console.log("Get user succeded.");
                this.authenticationService.setAuthenticated(true);
                this.router.navigateByUrl('/tech-resource');
        });
    }


}