import { Component, OnInit } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TechResourceStatus } from './tech-resource-status';
import { TechResourceType } from './tech-resource-type';
import { Tag } from './tag';
import { TagService } from './tag-service';

@Component({
    selector: 'edit-tech-resource',
    templateUrl: './edit-tech-resource.component.html',
    styleUrls: ['./edit-tech-resource.component.css']
})
export class EditTechResourceComponent implements OnInit {
    private resource: TechResource;
    private existingTags: Array<Tag> = [];
    private assignedTags: Array<Tag> = [];
    constructor(private techResourceService: TechResourceService,
            private tagService: TagService,
            private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        let id: number = +this.route.snapshot.paramMap.get('id');
        this.tagService.getTags()
            .then(res => this.existingTags = res);
        this.techResourceService.getTechResourceById(id)
            .then(res => this.resource = res)
            .then(res => this.assignedTags = res.tags);
    }

    addTag(tag: Tag): void {
        this.assignedTags.push(tag);
    }

    removeTag(tag: Tag): void {
        const idx: number = this.assignedTags.indexOf(tag);
        this.assignedTags.splice(idx, 1);
    }

    updateTechResource(title: string, link: string, status: string, resourceType: string): void {
        const updatedStatus: TechResourceStatus = TechResourceStatus[status];
        const type: TechResourceType = TechResourceType[resourceType];
        const updatedResource: TechResource = new TechResource(this.resource.id,
            title, link, this.resource.createdOn, updatedStatus, type);
        updatedResource.tags = this.assignedTags;
        this.techResourceService.updateResource(updatedResource)
            .then(result => this.router.navigateByUrl('/tech-resources'));
    }
}
