import {Component} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { Router } from '@angular/router';
import { TechResourceStatus } from './tech-resource-status';
import { TechResourceDetailsDTO } from './tech-resource-details-dto';
import { AuthService } from './services/auth.service';

@Component(
    {
        selector: 'tech-resources',
        templateUrl: './tech-resources.component.html',
        styleUrls: ['./tech-resources.component.css']
    }
)
export class TechResourcesComponent {
    pageId = 1;
    techResourcesDetailsDTOs: TechResourceDetailsDTO[] = [];
    constructor(private authService: AuthService,
        private resourceService: TechResourceService,
        private router: Router) {}

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            console.log('Getting resources from remote server.')
            this.resourceService.getTechResourceDetailsDTO()
            .then(result => this.techResourcesDetailsDTOs = result);
        } else {
            console.log('Skipping getting  resources - not authenticated');
        }
    }

    markAsRead(resourceId: number): void {
        console.log('Marking resource [' + resourceId + '] as read.');
        this.resourceService.markResourceAsRead(resourceId)
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

    private pushAll(resourcePage: TechResourceDetailsDTO[]): void {
        let idx = 0;
        for (idx = 0; idx < resourcePage.length; idx++) {
            this.techResourcesDetailsDTOs.push(resourcePage[idx]);
        }
    }

    private updateTechResource(resource: TechResource): TechResource {
        const updatedResource: TechResource =
            new TechResource(resource.id, resource.title, resource.link,
                resource.createdOn, TechResourceStatus.Processed, resource.type);
        updatedResource.tags = [];
        return updatedResource;
    }

    private reload(): void {
        console.log('Reloading resource after update');
        this.resourceService.getTechResourceDetailsDTO()
        .then(result => this.techResourcesDetailsDTOs = result);
    }
}
