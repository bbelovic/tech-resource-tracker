import { Component } from "@angular/core";
import { TechResourceService } from "./tech-resource-service";
import { OnInit } from "@angular/core";
import { TechResource } from "./tech-resource";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { TechResourceStatus } from "./tech-resource-status";
import { TechResourceType } from "./tech-resource-type";

@Component({
    selector: 'edit-tech-resource',
    templateUrl: './edit-tech-resource.component.html',
    styleUrls: ['./edit-tech-resource.component.css']
})
export class EditTechResourceComponent implements OnInit {
    private resource: TechResource;
    constructor(private techResourceService: TechResourceService,
            private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        let id: number = +this.route.snapshot.paramMap.get('id');
        this.techResourceService.getTechResourceById(id)
            .then(res => this.resource = res);
    }

    updateTechResource(title: string, link: string, status: string, resourceType: string): void {
        let updatedStatus: TechResourceStatus = TechResourceStatus[status];
        let type: TechResourceType = TechResourceType[resourceType];
        let updatedResource: TechResource = new TechResource(this.resource.id,
            title, link, this.resource.createdOn, updatedStatus, type);
        this.techResourceService.updateResource(updatedResource)
            .then(result => this.router.navigateByUrl('/tech-resources'));
    }
}