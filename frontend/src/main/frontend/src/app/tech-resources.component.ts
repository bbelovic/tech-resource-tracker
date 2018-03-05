import {Component} from '@angular/core';
import {AuthenticationService} from './authentication-service';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { Router } from '@angular/router';
import { TechResourceStatus } from './tech-resource-status';

@Component(
    {
        selector: 'tech-resources',
        templateUrl: './tech-resources.component.html',
        styleUrls: ['./tech-resources.component.css']
    }
)
export class TechResourcesComponent {
    pageId: number = 1;
    techResources: TechResource[] = [];
    constructor(private authenticationService: AuthenticationService, 
        private resourceService: TechResourceService,
        private router: Router) {}

    ngOnInit(): void {
        if (this.authenticationService.isAuthenticated()) {
            console.log("Getting resources from remote server.")
            this.resourceService.getTechResource()
            .then(result => this.techResources = result);
        } else {
            console.log("Skipping getting  resources - not authenticated");
        }
    }

    markAsRead(resource: TechResource): void {
        console.log("Marking resource ["+ resource +"] as read.");
        this.resourceService.markResourceAsRead(resource.id)
            .then(res => this.reload());
    }

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    navigateToEdit(resourceId: number): void {
        this.router.navigateByUrl('/edit-tech-resource/' + resourceId);
    }

    loadMoreResources(): void {
        this.resourceService.getPagedTechnologyResources(this.pageId)
            .then(res => this.pushAll(res));
        this.pageId = this.pageId + 1;

    }

    private pushAll(resourcePage: TechResource[]): void {
        let idx: number = 0;
        for (idx = 0; idx < resourcePage.length; idx++) {
            this.techResources.push(resourcePage[idx]);
        }
    }

    private updateTechResource(resource: TechResource): TechResource {
        let updatedResource: TechResource = 
            new TechResource(resource.id, resource.title, resource.link, 
                resource.createdOn, TechResourceStatus.Processed, resource.type);
        updatedResource.tags = [];
        return updatedResource;
    }

    private remove(resource: TechResource): void {
        let idx: number = 0;
        for (idx = 0 ; idx < this.techResources.length; idx++) {
            if (this.techResources[idx].id === resource.id) {
                console.log("Found resource on position "+ idx);
                this.techResources.splice(idx, 1);
                break;
            }
        }
    }

    private reload(): void {
        console.log("Reloading resource after update");
        this.resourceService.getTechResource()
        .then(result => this.techResources = result);
    }
}