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
      console.log(`firstChange = ${firstChange}, updatedResourceCurr = [id: ${updatedResourceCurr.id}, title: ${updatedResourceCurr.title}, link: ${updatedResourceCurr.link}]`);
    } else {
      console.log(`updatedResourceCurr = ${updatedResourceCurr}`)
    }

    
  }

  ngOnInit(): void {
    // TODO: remove this
    console.log(`Got: ${this.updatedResource.id}, title: ${this.updatedResource.title} ### REMOVE THIS ngOnit call ###`);
    /*if (this.updatedResource !== null && this.updatedResource !== undefined) {
      this.techResourceForm.controls['title'].setValue(this.updatedResource.title);
      this.techResourceForm.controls['link'].setValue(this.updatedResource.link);
      this.techResourceForm.controls['resourceType'].setValue(TechResourceType[this.updatedResource.type]);
      console.log(`---> ${this.updatedResource.type}, ${TechResourceType[this.updatedResource.type]}`)
    }*/
    
  }

  onSubmit() {
    const title = this.techResourceForm.value.title
    const link = this.techResourceForm.value.link
    const resourceType = this.techResourceForm.value.resourceType;
    const createdOn = this.dateTimeService.createdOn();


    const isUpdate = (this.updatedResource !== null && this.updatedResource !== undefined);

    console.log(`isUpdate = ${isUpdate}, type = ${resourceType}, id = ${this.updatedResource?.id}, 
    updatedtuitle = ${this.techResourceForm.value.title}, get() ${this.techResourceForm.get('title').value}`);
    const id = isUpdate ? this.updatedResource.id : 0;


    const techResource = new TechResource(id, title, link, createdOn, TechResourceStatus.New, TechResourceType[resourceType]);
    techResource.tags = [];
    this.techService.postNewTechResource2(techResource)
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
