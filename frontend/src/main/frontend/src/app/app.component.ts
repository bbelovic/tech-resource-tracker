import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {OnInit} from '@angular/core';
import {TechResource} from './tech-resource';
import {Router} from '@angular/router';
import {TechResourceService} from './tech-resource-service';

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

  constructor(private resourceService: TechResourceService, 
    private httpClient: HttpClient, private router: Router) {}

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
    let url: string = '/logout';
    console.log("Logging out.");
    this.httpClient.post(url, {observe: 'response'})
      .subscribe(res => {
        console.log('in success');
        this.authenticated = false; 
        this.router.navigateByUrl('/dummy');
        console.log('res=' + res); }, 
                err=>{console.log('error=' + err.url); this.router.navigateByUrl('/dummy');})
                
    this.authenticated = false;
    console.log("Logged out.");
    
  } 
  
}
