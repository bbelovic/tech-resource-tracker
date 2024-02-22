import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from 'app/services/date-time.service';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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


    //const isUpdate = (this.updatedResource !== null && this.updatedResource !== undefined);
    const id = isUpdate ? this.updatedResource.id : 0;
    const createdOn = isUpdate ? this.updatedResource.createdOn : this.dateTimeService.createdOn();

    // use behaviour subject?
    if ()
    

    const type = TechResourceType[resourceType];
    const resourceToSubmit = new TechResource(id, title, link, createdOn, TechResourceStatus.New, type);
    resourceToSubmit.tags = isUpdate ? this.updatedResource.tags : [];
    
    
    const techResource = new TechResource(id, title, link, createdOn, TechResourceStatus.New, TechResourceType[resourceType]);
    techResource.tags = [];
    this.techResourceService.postNewTechResource2(resourceToSubmit)
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
