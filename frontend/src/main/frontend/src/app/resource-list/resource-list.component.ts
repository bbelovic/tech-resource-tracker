import { Component, OnInit } from '@angular/core';
import { TagDTO } from 'app/tag-dto';
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
        //this.techResourcesDetailsDTOs  = [new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java')])]
        console.log(`Received ${this.techResourcesDetailsDTOs.length} dtos.`);
    }

}
