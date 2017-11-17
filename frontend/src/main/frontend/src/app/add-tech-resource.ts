import { Component } from '@angular/core';
import { TechResourceService } from './tech-resource-service';
import { TechResource } from './tech-resource';
import { Router } from '@angular/router';
@Component({
    selector: 'add-tech-resource',
    templateUrl: './add-tech-resource.html',
    styleUrls: ['./add-tech-resource.css']
})
export class AddTechResourceComponent {
    constructor(private techService: TechResourceService, private router: Router) {}

    addNewTechResource(title: string, link: string): void {
        let techResource: TechResource = new TechResource(0, title, link);
        this.techService.postNewTechResource(techResource);
        this.router.navigateByUrl('/tech-resource');
    }
}