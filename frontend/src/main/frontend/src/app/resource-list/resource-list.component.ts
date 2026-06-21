import { Component, OnInit } from '@angular/core';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';
import { TechResourceService } from 'app/tech-resource-service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css'],
  standalone: false
})
export class ResourceListComponent implements OnInit {

  techResourcesDetailsDTOs: Observable<TechResourceDetailsDTO[]> = of([]);
    constructor(private resourceService: TechResourceService) { }

      ngOnInit() {
        console.log('Getting resources from remote server.')
        this.techResourcesDetailsDTOs = this.resourceService.getTechResourceDetails();      
        console.log(`Received ${this.techResourcesDetailsDTOs} dtos.`);
    }
}
