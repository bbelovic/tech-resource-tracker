import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateTimeService } from 'app/services/date-time.service';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tech-resource-form',
  templateUrl: './tech-resource-form.component.html',
  styleUrls: ['./tech-resource-form.component.css']
})
export class TechResourceFormComponent implements OnInit {

  updatedResource: TechResource;
  result: string = 'na';
  techResourceForm = this.fb.group({
    title: [''],
    link: [''],
    resourceType: ['']
  });

  constructor(private fb: FormBuilder, private techService: TechResourceService, private dateTimeService: DateTimeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const title = this.techResourceForm.value.title
    const link = this.techResourceForm.value.link
    const resourceType = this.techResourceForm.value.resourceType;
    const createdOn = this.dateTimeService.createdOn();
    const techResource = new TechResource(0, title, link, createdOn, TechResourceStatus.New, TechResourceType[resourceType]);
    techResource.tags = [];
    this.techService.postNewTechResource2(techResource)
      .pipe(map((res: TechResource) => {
        if (res.id > 0) {
          return 'Created';
        } else {
          return 'NotCreated';
        }
      })).subscribe(s => this.result = s);
  }
}

export enum ResourceSubmissionStatus {
  Unknown = 'Unknown',
  Created = 'Created',
  NotCreated = 'NotCreated'
}
