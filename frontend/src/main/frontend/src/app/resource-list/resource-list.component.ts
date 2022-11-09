import { Component, OnInit } from '@angular/core';
import { TagDTO } from 'app/tag-dto';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';
import { TechResourceService } from 'app/tech-resource-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  techResourcesDetailsDTOs: Observable<Object>;
    constructor(private resourceService: TechResourceService) { }

      ngOnInit() {
        console.log('Getting resources from remote server.')
        this.techResourcesDetailsDTOs = this.resourceService.getTechResourceDetailsDTO2();      
        //this.techResourcesDetailsDTOs = [];
        /*for (const each of temp) {
          this.techResourcesDetailsDTOs
            .push(new TechResourceDetailsDTO(each.id, each.title, each.title, each.tagDTOs));
        }*/
        //this.techResourcesDetailsDTOs  = [new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java')])]
        console.log(`Received ${this.techResourcesDetailsDTOs} dtos.`);
    }

}
