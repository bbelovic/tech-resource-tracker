import { Component } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { TechResourceStatus } from './tech-resource-status';
import { Router } from '@angular/router';
import { TechResourceType } from './tech-resource-type';
import { Tag } from './tag';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TagService } from './tag-service';
@Component({
    selector: 'add-tech-resource',
    templateUrl: './add-tech-resource.component.html',
    styleUrls: ['./add-tech-resource.component.css']
})
export class AddTechResourceComponent implements OnInit {
    private existingTags: Array<Tag> = [];
    private assignedTags: Array<Tag> = [];
    constructor(private techService: TechResourceService, 
        private tagService: TagService,
        private router: Router) {}

    public ngOnInit(): void {
        this.tagService.getTags().then(result => this.existingTags = result);

    }

    addNewTechResource(title: string, link: string, type: string): void {
        let createdOn: string = this.buildCreatedOnDate();
        let resourceType: TechResourceType = TechResourceType[type];
        let techResource: TechResource = new TechResource(0, title, link, createdOn, TechResourceStatus.New, resourceType);
        techResource.tags = this.assignedTags;
        this.techService.postNewTechResource(techResource)
            .then(result => this.router.navigateByUrl('/tech-resources'));        
    }

    addTag(tag: Tag): void {
        this.assignedTags.push(tag);
        console.log("Added tag= "+ tag);
    }

    addNewTag(id: number, name: string): void {
        this.addTag(new Tag(id, name));
    }

    private buildCreatedOnDate(): string {
        let now: string = new Date().toISOString();
        return now.substring(0, now.indexOf('.'));
    }
}