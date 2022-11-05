import { Component, OnInit } from '@angular/core';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';
import { TechResourceService } from 'app/tech-resource-service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  techResourcesDetailsDTOs: TechResourceDetailsDTO[] = [];
    constructor(private resourceService: TechResourceService) { }

    async ngOnInit() {
        console.log('Getting resources from remote server.')
        this.techResourcesDetailsDTOs = await this.resourceService.getTechResourceDetailsDTO();        
        console.log(`Received ${this.techResourcesDetailsDTOs.length} dtos.`);
    }

}
