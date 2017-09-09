import {TechResource} from './tech-resource';
import {Injectable} from '@angular/core';
import {OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

}
