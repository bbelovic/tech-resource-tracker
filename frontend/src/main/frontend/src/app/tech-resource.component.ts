import {Component} from '@angular/core';
import {AuthenticationService} from './authentication-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';

@Component(
    {
        selector: 'tech-resource',
        templateUrl: './tech-resource.component.html',
        styleUrls: ['./tech-resource.component.css']
    }
)
export class TechResourceComponent implements OnInit {
    techResources: TechResource[] = [];
    constructor(private authenticationService: AuthenticationService, 
        private resourceService: TechResourceService) {}

    ngOnInit(): void {
        if (this.authenticationService.isAuthenticated()) {
            console.log("Getting resources from remote server.")
            this.resourceService.getTechResource()
            .then(result => this.techResources = result);
        } else {
            console.log("Skipping getting  resources - not authenticated");
        }
    }

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}