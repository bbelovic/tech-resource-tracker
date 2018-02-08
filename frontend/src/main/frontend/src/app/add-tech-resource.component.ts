import { Component } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { TechResourceStatus } from './tech-resource-status';
import { Router } from '@angular/router';
import { TechResourceType } from './tech-resource-type';
import { Tag } from './tag';
@Component({
    selector: 'add-tech-resource',
    templateUrl: './add-tech-resource.component.html',
    styleUrls: ['./add-tech-resource.component.css']
})
export class AddTechResourceComponent {
    private tags: Array<Tag> = [];
    constructor(private techService: TechResourceService, private router: Router) {}

    addNewTechResource(title: string, link: string, type: string): void {
        let createdOn: string = this.buildCreatedOnDate();
        let resourceType: TechResourceType = TechResourceType[type];
        let techResource: TechResource = new TechResource(0, title, link, createdOn, TechResourceStatus.New, resourceType);
        techResource.tags = this.tags;
        this.techService.postNewTechResource(techResource)
            .then(result => this.router.navigateByUrl('/tech-resources'));        
    }

    addTag(id: number, name: string): void {
        var tag = new Tag(id, name);
        this.tags.push(tag);
        console.log("Added tag= "+ tag);
    }
    private buildCreatedOnDate(): string {
        let now: string = new Date().toISOString();
        return now.substring(0, now.indexOf('.'));
    }
}