import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from 'app/services/date-time.service';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  editedResource: Observable<Object>;
  isUpdate = false;
  result: string = 'na';
  techResourceForm = this.fb.group({
    title: [''],
    // todo: remove
    title2: [''],
    link: [''],
    resourceType: ['']
  });

  constructor(private fb: FormBuilder, private techResourceService: TechResourceService, private route: ActivatedRoute, private dateTimeService: DateTimeService, ) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== 0) {
      this.isUpdate = true;
      this.editedResource = this.techResourceService.getTechResourceById2(id);
      this.techResourceService.getTechResourceById2(id)
        .pipe(map((res: TechResource) => {
          const formData: FormData = new FormData();
          formData.title = res.title;
          formData.title2 = res.title;
          formData.link = res.link;
          formData.resourceType = res.type;
          return formData;
         
        })).subscribe(s => {
          console.log(`Patching: link = ${s.link} title = ${s.title}, resourceType = ${s.resourceType}`)
          this.techResourceForm.patchValue(s);
          this.techResourceForm.controls.resourceType.setValue(s.resourceType)
        });

    }   
  }


  onSubmit() {
    const title = this.techResourceForm.value.title
    const link = this.techResourceForm.value.link
    const resourceType = this.techResourceForm.value.resourceType;

    if (this.isUpdate) {
      this.editedResource.pipe(mergeMap((res: TechResource) => {
        const m = this.toResourceTypeEnumValue(resourceType);
        const type = TechResourceType[this.toResourceTypeEnumValue(resourceType)];
        console.log(`type = ${type} resourceType = ${resourceType} m = ${m} c = ${TechResourceType[resourceType]}`)
        const resourceToSubmit = new TechResource(res.id, title, link, res.createdOn, TechResourceStatus.New, type);
        resourceToSubmit.tags = this.isUpdate ? res.tags : [];
        return this.techResourceService.postNewTechResource2(resourceToSubmit); 
      })).pipe(map((res: TechResource) => {
        if (res.id > 0 && this.isUpdate) {
          return 'Updated';
        } else {
          return 'Update failed';
        }
      })).subscribe(s => this.result = s);

    } else {
      const createdOn = this.dateTimeService.createdOn();
      const type = TechResourceType[this.toResourceTypeEnumValue(resourceType)];
      const resourceToSubmit = new TechResource(0, title, link, createdOn, TechResourceStatus.New, type);
      resourceToSubmit.tags = [];
      this.techResourceService.postNewTechResource2(resourceToSubmit)
      .pipe(map((res: TechResource) => {
        if (res.id > 0 ) {
          return 'Created';
        } else {
          return 'Resource creation failed';
        }
      })).subscribe(s => this.result = s);
    }

  }

  private toResourceTypeEnumValue(valueFromForm: string) {
    const c = valueFromForm.charAt(0);
    const rem = valueFromForm.substring(1).toLowerCase()
    return `${c} + ${rem}`;
  }
}

export class FormData {
  title?: string;
  title2?: string;
  link?: string;
  resourceType?: string;
}