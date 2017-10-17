import {TechResource} from './tech-resource';
import {Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class TechResourceService {
    constructor(private http: HttpClient) {
    }

    getTechResource(): Promise<TechResource[]> {
    let url: string = '/tech-resources';
    console.log("Getting all technology resources from: [" + url + "].");
    return this.http.get(url)
            .toPromise()
            .then(data => data as TechResource[])
    }

    postNewTechResource(resource: TechResource): Promise<TechResource> { 
        let url: string = '/tech-resources';
        console.log("Creating new resource [" + JSON.stringify(resource) + "] through "+ url);  
        return this.http.post(url, JSON.stringify(resource), 
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise()
        .then(res => res as TechResource );
    }

}
