import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class TechResourceFormComponent implements OnInit, OnChanges {

  @Input()
  updatedResource: TechResource;
  result: string = 'na';
  techResourceForm = this.fb.group({
    title: [''],
    link: [''],
    resourceType: ['']
  });

  constructor(private fb: FormBuilder, private techService: TechResourceService, private dateTimeService: DateTimeService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    const firstChange = changes['updatedResource'].isFirstChange();
    const updatedResourceCurr = changes['updatedResource'].currentValue;
    if (updatedResourceCurr !== null && updatedResourceCurr !== undefined) {
      console.log(`ngOnChanges: firstChange = ${firstChange}, updatedResourceCurr = [id: ${updatedResourceCurr.id}, title: ${updatedResourceCurr.title}, link: ${updatedResourceCurr.link}]`);
    } else {
      console.log(`ngOnChanges: updatedResourceCurr = [${updatedResourceCurr}]`)
    }
  }

  ngOnInit(): void {
    if (this.updatedResource !== null && this.updatedResource !== undefined) {
      console.log(`ngOnInit: updatedResource = [id: ${this.updatedResource.id}, title: ${this.updatedResource.title}, link: ${this.updatedResource.link}]`);
    } else {
      console.log(`ngOnInit: updatedResource = [${this.updatedResource}]`);
    }    
  }

  onSubmit() {
    const title = this.techResourceForm.value.title
    const link = this.techResourceForm.value.link
    const resourceType = this.techResourceForm.value.resourceType;
    //const createdOn = this.dateTimeService.createdOn();


    const isUpdate = (this.updatedResource !== null && this.updatedResource !== undefined);

    /*if (isUpdate) {

      
      const xx = TechResourceType[resourceType]
      console.log(`onSubmit: isUpdate = ${isUpdate}, id: ${this.updatedResource.id} title: ${this.techResourceForm.value.title}, 
        link: ${this.techResourceForm.value.link} resourceType: ${this.techResourceForm.value.resourceType} => ${xx}, tags: ${this.updatedResource.tags}`);
    } else {
      console.log(`onSubmit: isUpdate = ${isUpdate}, title: ${this.techResourceForm.value.title}, 
        link: ${this.techResourceForm.value.link} resourceType: ${this.techResourceForm.value.resourceType}`);
    }*/


    const id = isUpdate ? this.updatedResource.id : 0;
    const createdOn = isUpdate ? this.updatedResource.createdOn : this.dateTimeService.createdOn();
    

    const resourceToSubmit = new TechResource(id, title, link, createdOn, TechResourceStatus.New, (resourceType as TechResourceType));
    resourceToSubmit.tags = isUpdate ? this.updatedResource.tags : [];
    

    console.log(`onSubmit: isUpdate = ${isUpdate}, id: ${resourceToSubmit.id} title: ${resourceToSubmit.title}, 
        link: ${resourceToSubmit.link} resourceType: ${resourceType} => ${resourceToSubmit.type} => ${TechResourceType[resourceType]}, tags: ${resourceToSubmit.tags}`);

    
    const techResource = new TechResource(id, title, link, createdOn, TechResourceStatus.New, TechResourceType[resourceType]);
    techResource.tags = [];
    this.techService.postNewTechResource2(resourceToSubmit)
      .pipe(map((res: TechResource) => {
        if (res.id > 0) {
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
