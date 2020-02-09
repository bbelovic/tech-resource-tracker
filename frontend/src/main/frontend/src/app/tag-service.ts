import { HttpClient } from '@angular/common/http';
import { Tag } from './tag';
import { Injectable } from '@angular/core';

@Injectable()
export class TagService {
    private readonly tagsBaseUrl: string = '/tags';
    constructor(private httpClient: HttpClient) {}

    getTags(): Promise<Tag[]> {
        console.log('Getting all tags defined in the system.');
        return this.httpClient.get(this.tagsBaseUrl)
            .toPromise()
            .then(data => data as Tag[]);

    }
}
