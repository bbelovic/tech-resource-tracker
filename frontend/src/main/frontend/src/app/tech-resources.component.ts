import {Component} from '@angular/core';
import {AuthenticationService} from './authentication-service';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { Router } from '@angular/router';

@Component(
    {
        selector: 'tech-resources',
        templateUrl: './tech-resources.component.html',
        styleUrls: ['./tech-resources.component.css']
    }
)
export class TechResourcesComponent {
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
        this.resourceService.updateResourceStatus(resource, "PROCESSED")

            .then(res => this.router.navigateByUrl('/tech-resources'));
    }

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    private remove(resource: TechResource): void {
         let idx: number = this.techResources.indexOf(resource);
         console.log("idx: "+ idx);
         if (idx > -1) {
             console.log("Removing..")
             this.techResources.splice(idx, 1);
         }
    }
}