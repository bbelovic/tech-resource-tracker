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
        let foundTag: Tag = this.checkTagForLoop(new Tag(id, name));
        if (foundTag === undefined) {
            console.log("Tag "+ name + " not yet defined");
            this.addTag(new Tag(id, name));
        } else {
            console.log("Tag "+ name + " already defined");
            this.addTag(foundTag);
        }
        
    }

    private checkTag(tag: Tag): Tag {
        return this.existingTags.find(function (value: Tag) {
            let valueName: string = value.getName();
            let tagName: string = tag.getName();
            return valueName === tagName;
        });
    }

    private checkTagForLoop(tag: Tag): Tag {
        let i: number = 0;
        for (i = 0; i < this.existingTags.length; i++) {
            if (this.existingTags[i].getName() === tag.getName()) {
                return this.existingTags[i];
            }
        }
    }


    private buildCreatedOnDate(): string {
        let now: string = new Date().toISOString();
        return now.substring(0, now.indexOf('.'));
    }
}