import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';
import { TechResourceService } from 'app/tech-resource-service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  techResourcesDetailsDTOs: TechResourceDetailsDTO[] = [];
    constructor(private resourceService: TechResourceService,
        private router: Router) { }

    ngOnInit(): void {
        console.log('Getting resources from remote server.')
        this.resourceService.getTechResourceDetailsDTO()
            .then(result => this.techResourcesDetailsDTOs = result);
        console.log('Received ' + this.techResourcesDetailsDTOs.length);
    }

}
