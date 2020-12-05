import { Component } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { Router } from '@angular/router';
import { TechResourceDetailsDTO } from './tech-resource-details-dto';

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
    constructor(private resourceService: TechResourceService,
        private router: Router) { }

    ngOnInit(): void {
        console.log('Getting resources from remote server.')
        this.resourceService.getTechResourceDetailsDTO()
            .then(result => this.techResourcesDetailsDTOs = result);

    }

    markAsRead(resourceId: number): void {
        console.log('Marking resource [' + resourceId + '] as read.');
        this.resourceService.markResourceAsRead(resourceId)
            .then(() => this.reload());
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

    private reload(): void {
        console.log('Reloading resource after update');
        this.resourceService.getTechResourceDetailsDTO()
            .then(result => this.techResourcesDetailsDTOs = result);
    }
}
