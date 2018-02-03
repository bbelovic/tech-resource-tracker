import { Component } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { TechResourceStatus } from './tech-resource-status';
import { Router } from '@angular/router';
import { TechResourceType } from './tech-resource-type';
@Component({
    selector: 'add-tech-resource',
    templateUrl: './add-tech-resource.component.html',
    styleUrls: ['./add-tech-resource.component.css']
})
export class AddTechResourceComponent {
    constructor(private techService: TechResourceService, private router: Router) {}

    addNewTechResource(title: string, link: string, type: string): void {
        let createdOn: string = this.buildCreatedOnDate();
        let resourceType: TechResourceType = TechResourceType[type];
        let techResource: TechResource = new TechResource(0, title, link, createdOn, TechResourceStatus.New, resourceType);
        this.techService.postNewTechResource(techResource)
            .then(result => this.router.navigateByUrl('/tech-resources'));        
    }

    private buildCreatedOnDate(): string {
        let now: string = new Date().toISOString();
        return now.substring(0, now.indexOf('.'));
    }
}