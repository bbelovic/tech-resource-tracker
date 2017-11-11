import {Component} from '@angular/core';
import {AuthenticationService} from './authentication-service';
@Component(
    {
        selector: 'dummy',
        templateUrl: './dummy.component.html',
        styleUrls: ['./dummy.component.css']
    }
)
export class DummyComponent {
    authenticated: boolean = false;
    constructor(private authenticationService: AuthenticationService) {}

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}