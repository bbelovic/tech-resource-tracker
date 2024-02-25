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
    if (id !== null) {
      this.isUpdate = true;
      this.editedResource = this.techResourceService.getTechResourceById2(id);
    }   
  }


  onSubmit() {
    const title = this.techResourceForm.value.title
    const link = this.techResourceForm.value.link
    const resourceType = this.techResourceForm.value.resourceType;

    if (this.isUpdate) {
      this.editedResource.pipe(mergeMap((res: TechResource) => {
        const type = TechResourceType[resourceType];
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
      const type = TechResourceType[resourceType];
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
}
