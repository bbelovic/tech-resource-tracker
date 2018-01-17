import {TechResource} from './tech-resource';
import {Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class TechResourceService {
    private readonly url: string = '/tech-resources';
    constructor(private http: HttpClient) {
    }

    getTechResource(): Promise<TechResource[]> {
    console.log("Requesting 10 newest resources from: [" + this.url + "].");
    return this.http.get(this.url)
            .toPromise()
            .then(data => data as TechResource[])
    }

    postNewTechResource(resource: TechResource): Promise<TechResource> { 
        console.log("Creating new resource [" + JSON.stringify(resource) + "] through "+ this.url);  
        return this.http.post(this.url, JSON.stringify(resource), 
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise()
        .then(res => res as TechResource );
    }

    updateResourceStatus(resource: TechResource, newStatus: string): Promise<TechResource> {
        let updatedResource: TechResource = 
            new TechResource(resource.id, resource.title, resource.link, 
                resource.createdOn, newStatus);
        console.log("Updating resource ["+ JSON.stringify(updatedResource) +"]."); 
        return this.http.put(this.url, JSON.stringify(updatedResource), 
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise()
        .then(res => res as TechResource);
    }
}
