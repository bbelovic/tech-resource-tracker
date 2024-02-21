import { Component, Input } from '@angular/core';
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
export class TechResourceFormComponent {

  @Input()
  updatedResource: TechResource;
  result: string = 'na';
  techResourceForm = this.fb.group({
    title: [''],
    // todo: remove
    title2: [''],
    link: [''],
    resourceType: ['']
  });

  constructor(private fb: FormBuilder, private techService: TechResourceService, private dateTimeService: DateTimeService) { }

  onSubmit() {
    const title = this.techResourceForm.value.title
    const link = this.techResourceForm.value.link
    const resourceType = this.techResourceForm.value.resourceType;


    const isUpdate = (this.updatedResource !== null && this.updatedResource !== undefined);
    const id = isUpdate ? this.updatedResource.id : 0;
    const createdOn = isUpdate ? this.updatedResource.createdOn : this.dateTimeService.createdOn();
    

    const type = TechResourceType[resourceType];
    const resourceToSubmit = new TechResource(id, title, link, createdOn, TechResourceStatus.New, type);
    resourceToSubmit.tags = isUpdate ? this.updatedResource.tags : [];
    
    
    const techResource = new TechResource(id, title, link, createdOn, TechResourceStatus.New, TechResourceType[resourceType]);
    techResource.tags = [];
    this.techService.postNewTechResource2(resourceToSubmit)
      .pipe(map((res: TechResource) => {
        if (res.id > 0 && isUpdate === false) {
          return 'Created';
        } else if (res.id > 0 && isUpdate) {
          return 'Updated';
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
