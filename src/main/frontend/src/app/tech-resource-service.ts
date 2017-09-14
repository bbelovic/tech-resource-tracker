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
    return this.http.get('http://localhost:8080/tech-resources')
            .toPromise()
            .then(data => data as TechResource[])
    }

    postNewTechResource(resource: TechResource): Promise<TechResource> { 
        console.log('JSON=' + JSON.stringify(resource));      
        return this.http.post('http://localhost:8080/tech-resources', JSON.stringify(resource), 
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise()
        .then(res => res as TechResource );
    }

}
