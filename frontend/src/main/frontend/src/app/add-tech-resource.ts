import { Component } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
@Component({
    selector: 'add-tech-resource',
    templateUrl: './add-tech-resource.html',
    styleUrls: ['./add-tech-resource.css']
})
export class AddTechResourceComponent {
    constructor(private techService: TechResourceService) {}

    addNewTechResource(title: string, link: string): void {
        let techResource: TechResource = new TechResource(0, title, link);
        this.techService.postNewTechResource(techResource);
    }
}