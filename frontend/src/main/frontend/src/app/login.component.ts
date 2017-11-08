import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent {
    constructor (private httpClient: HttpClient) {

    }

    login(username: string, password: string): void {
        this.httpClient.get('user');
    }


}