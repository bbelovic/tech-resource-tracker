import {Component} from '@angular/core';
import {AuthenticationService} from './authentication-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
@Component(
    {
        selector: 'dummy',
        templateUrl: './dummy.component.html',
        styleUrls: ['./dummy.component.css']
    }
)
export class DummyComponent implements OnInit {
    techResources: TechResource[] = [];
    constructor(private authenticationService: AuthenticationService, 
        private resourceService: TechResourceService) {}

    ngOnInit(): void {
        if (this.authenticationService.isAuthenticated()) {
            console.log("Getting resources from remote server.")
            this.resourceService.getTechResource().then(result => this.techResources = result);
        } else {
            console.log("Skipping getting  resources - not authenticated");
        }
    }
    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}