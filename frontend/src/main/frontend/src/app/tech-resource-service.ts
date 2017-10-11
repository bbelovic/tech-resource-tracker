import {TechResource} from './tech-resource';
import {Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class TechResourceService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getTechResource(): Promise<TechResource[]> {
    let url: string = this.apiUrl + '/tech-resources';
    console.log("Getting all technology resources from: [" + url + "].");
    return this.http.get(url)
            .toPromise()
            .then(data => data as TechResource[])
    }

    postNewTechResource(resource: TechResource): Promise<TechResource> { 
        let url: string = this.apiUrl + '/tech-resources';
        console.log("Creating new resource [" + JSON.stringify(resource) + "] through "+ url);  
        let token: string = document.cookie;
        let values: string[] = token.split("=");
        return this.http.post(url, JSON.stringify(resource), 
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
        .set('X-' + values[0], values[1])})
        .toPromise()
        .then(res => res as TechResource );
    }

}
