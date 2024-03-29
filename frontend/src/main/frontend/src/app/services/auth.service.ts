import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/user';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _$authenticationState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private location: Location) {
  }

  getUser(): Observable<User> {
    console.log(`GET ${environment.apiUrl}/user`);
    return this.http.get<User>(`${environment.apiUrl}/user`, {headers}).pipe(
      map((response: User) => {
        if (response !== null) {
          this._$authenticationState.next(true);
          return response;
        }
      })
    );
  }

  handleLogin(): Promise<boolean> {
    return this.getUser().toPromise().then((user: User) => { 
      console.log(`Handle login: ${user?.fullName}`);
      return user !== undefined;
    }).catch(() => {
      console.error(`Error in handleLogin`)
      return false;
    })
  }

  public get $authenticationState() {
    return this._$authenticationState;
  }

  login(): void { 
    location.href =
      `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/okta')}`;
  }

  logout(): void { 
    const redirectUri = `${location.origin}${this.location.prepareExternalUrl('/')}`;

    this.http.post(`${environment.apiUrl}/api/logout`, {}).subscribe((response: any) => {
      location.href = response.logoutUrl + '?id_token_hint=' + response.idToken
        + '&post_logout_redirect_uri=' + redirectUri;
    });
  }
}
