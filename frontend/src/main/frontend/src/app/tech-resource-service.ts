import {TechResource} from './tech-resource';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment'


import { TechResourceDetailsDTO } from './tech-resource-details-dto';
import { Observable } from 'rxjs';

@Injectable()
export class TechResourceService {
    private readonly url: string = `${environment.apiUrl}/tech-resources`;
    private readonly tokenUrl = `${environment.apiUrl}/token`;
    constructor(private http: HttpClient) {
    }

    getTechResource(): Promise<TechResource[]> {
    console.log(`Getting 10 newest resources from: [${this.url}].`);
    return this.http.get(this.url)
            .toPromise()
            .then(data => data as TechResource[])
    }

    getTechResourceDetailsDTO(): Promise<TechResourceDetailsDTO[]> {
        console.log(`Getting 10 newest resources from: [${this.url}].`);
        return this.http.get(this.url)
                 .toPromise()
                 .then(data => data as TechResourceDetailsDTO[]);
    }

    getTechResourceDetailsDTO2() {
        console.log(`Getting 10 newest resources from: [${this.url}].`);
        return this.http.get(this.url);
                 
    }

    getTechResourceById(id: number): Promise<TechResource> {
    console.log(`Getting technology resource with id [${id}].`);
        return this.http.get(this.url + '/' + id)
            .toPromise()
            .then(d => {console.log('JSON: ' + JSON.stringify(d)); return d})
            .then(data => data as TechResource);
    }

    getTechResourceById2(id: number) {
        console.log(`Getting technology resource with id [${id}].`);
        const resource = this.http.get(this.url + '/' + id);
        console.log(`Got [${resource}] for id [${id}]`);
        return resource;
    }
        

    postNewTechResource(resource: TechResource): Promise<TechResource> {
        console.log('Creating new resource [' + JSON.stringify(resource) + '] through ' + this.url);
        return this.http.post(this.url, JSON.stringify(resource),
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise()
        .then(res => res as TechResource );
    }

    postNewTechResource2(resource: TechResource): Observable<Object> {
        console.log('Creating new resource [' + JSON.stringify(resource) + '] through ' + this.url);
        return this.http.post(this.url, JSON.stringify(resource),
            {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')});
    }

    updateResource(resource: TechResource): Promise<TechResource> {
        console.log('Updating resource [' + JSON.stringify(resource) + '].');
        return this.http.put(this.url, JSON.stringify(resource),
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise()
        .then(res => res as TechResource);
    }

    markResourceAsRead(resourceId: number): Promise<Object> {
        console.log('Marking resource [' + resourceId + '] as read.');
        return this.http.put('/markAsRead/' + resourceId,
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')})
        .toPromise();
    }

    getPagedTechnologyResources(pageId: number): Promise<TechResourceDetailsDTO[]> {
        console.log(`Getting tech resources page [${pageId}] with size [10].`);
        return this.http.get(this.url + '/page/' + pageId + '/pageSize/10')
            .toPromise()
            .then(res => res as TechResourceDetailsDTO[]);

    }
}
