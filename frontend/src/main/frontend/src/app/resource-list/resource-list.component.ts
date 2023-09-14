import { Component, OnInit } from '@angular/core';
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
        console.log(`Received ${this.techResourcesDetailsDTOs} dtos.`);
    }
}
