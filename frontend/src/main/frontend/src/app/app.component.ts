import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {OnInit} from '@angular/core';
import {TechResource} from './tech-resource';
import {Router} from '@angular/router';
import {TechResourceService} from './tech-resource-service';
import { AuthenticationService } from './authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to technology resource tracker';
  tokenValue = '';
  tokenName = '';
  authenticated: boolean = false;
  resources: TechResource[];
  logoutAvailable: boolean = true;

  constructor(private resourceService: TechResourceService,
    private httpClient: HttpClient, private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    /*this.resourceService.getTechResource().then(result => this.resources = result);
    let v: string[] = document.cookie.split('=')
    this.tokenValue = v[1];
    this.tokenName = v[0];*/
    this.resources = [];
  }

  login(username: string, password: string): void {
    let url: string = '/tech-resources';
    console.log("Getting all technology resources from: [" + url + "].");

    this.httpClient.get(url, {headers: new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(username + ':' + password))})
            .toPromise()
            .then(data => {this.resources = (data as TechResource[]); this.authenticated = true;})

}

  createNewTechResource(title: string, link: string): void {
    this.resourceService.postNewTechResource(new TechResource(0, title, link))
      .then(resource => this.resources.push(resource));
  }

  logout(): void {
    this.authService.logout().then(obj => this.router.navigateByUrl('/tech-resource'));
  }

}
