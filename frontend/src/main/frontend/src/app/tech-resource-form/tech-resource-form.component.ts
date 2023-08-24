import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateTimeService } from 'app/services/date-time.service';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tech-resource-form',
  templateUrl: './tech-resource-form.component.html',
  styleUrls: ['./tech-resource-form.component.css']
})
export class TechResourceFormComponent implements OnInit {

  //submittedResource: TechResource;
  //submittedResourceState = new BehaviorSubject<ResourceSubmissionStatus>(ResourceSubmissionStatus.Unknown);
  submittedResourceState = new BehaviorSubject<string>('Unknown');
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
    console.log(`@@@ >>> onSubmit`)
    this.techService.postNewTechResource2(techResource)
      .pipe(map((res: TechResource) => {
        console.log(`@@@ res.id = ${res.id}`)
        if (res.id > 0) {
          this.submittedResourceState.next('Created');
        } else {
          this.submittedResourceState.next('NotCreated');
        }
        return res;
      })).subscribe(x => console.log(`Subscribed: ${x.id}`));
  }
}

export enum ResourceSubmissionStatus {
  Unknown = 'Unknown',
  Created = 'Created',
  NotCreated = 'NotCreated'
}
