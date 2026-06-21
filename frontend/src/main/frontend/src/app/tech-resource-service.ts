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

    getTechResourceDetails(): Observable<TechResourceDetailsDTO[]> {
        console.log(`Getting 10 newest resources from: [${this.url}].`);
        return this.http.get<TechResourceDetailsDTO[]>(this.url);
    }

    getTechResourceById(id: number): Observable<TechResource> {
        console.log(`Getting technology resource with id [${id}].`);
        return this.http.get<TechResource>(this.url + '/' + id);
    }

    createTechResource(resource: TechResource): Observable<TechResource> {
        console.log('Creating new resource [' + JSON.stringify(resource) + '] through ' + this.url);
        return this.http.post<TechResource>(this.url, JSON.stringify(resource),
            {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')});
    }

    updateResource(resource: TechResource): Observable<void> {
        console.log('Updating resource [' + JSON.stringify(resource) + '].');
        return this.http.put<void>(this.url, JSON.stringify(resource),
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')});
    }

    markResourceAsRead(resourceId: number): Observable<void> {
        console.log('Marking resource [' + resourceId + '] as read.');
        return this.http.put<void>('/markAsRead/' + resourceId,
        {headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')});
    }

    getPagedTechnologyResources(pageId: number): Observable<TechResourceDetailsDTO[]> {
        console.log(`Getting tech resources page [${pageId}] with size [10].`);
        return this.http.get<TechResourceDetailsDTO[]>(this.url + '/page/' + pageId + '/pageSize/10');

    }
}
