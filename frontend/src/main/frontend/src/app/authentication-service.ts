import { Injectable } from '@angular/core';
@Injectable()
export class AuthenticationService {
    private authenticated: boolean = false;

    isAuthenticated(): boolean {
        console.log("Return authenticated: "+ this.authenticated);
        return this.authenticated;
    }

    setAuthenticated(authenticated: boolean): void {
        console.log("Setting authenticated flag to:" + authenticated);
        this.authenticated = authenticated;
    }
}