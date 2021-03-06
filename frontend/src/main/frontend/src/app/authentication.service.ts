import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { from } from 'rxjs';

@Injectable()
export class AuthenticationService {
    private readonly userEndpoint = `${environment.apiUrl}/user`;
    private readonly logoutEndpoint = `${environment.apiUrl}/logout`;
    private authenticated = false;
    constructor(private httpClient: HttpClient) {}

    isAuthenticated(): boolean {
        console.log('Return authenticated: ' + this.authenticated);
        return this.authenticated;
    }

    setAuthenticated(authenticated: boolean): void {
        console.log('Setting authenticated flag to:' + authenticated);
        this.authenticated = authenticated;
    }

    logout(): Promise<Object> {
        return this.httpClient.post(this.logoutEndpoint, null)
            .toPromise().then(obj => this.logoutAndReport('ok', obj),
            obj => this.logoutAndReport('error', obj));

    }

    private logoutAndReport(status: string, o: Object): Object {
        this.authenticated = false;
        console.log('Logout status: ' + status);
        return o;
    }

    login(username: string, password: string): Promise<Object> {
        const authHeader: HttpHeaders = new HttpHeaders()
            .set('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.httpClient.get(this.userEndpoint, {headers: authHeader})
            .toPromise()
            .then(res => {
                console.log('Get user succeded.');
                this.setAuthenticated(true);
                return res;
        });
    }
}
