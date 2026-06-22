import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateTimeService } from 'app/services/date-time.service';
import { TechResource } from 'app/tech-resource';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css'],
  standalone: false
})
export class AddResourceComponent implements OnInit {

  editedResource: Observable<TechResource>;
  isUpdate = false;
  result: string = 'na';
  zoneStatus: string = 'zone=unknown';
  techResourceForm = this.fb.group({
    title: [''],
    link: [''],
    resourceType: ['ARTICLE']
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private techResourceService: TechResourceService,
    private route: ActivatedRoute,
    private dateTimeService: DateTimeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== 0) {
      this.isUpdate = true;
      this.editedResource = this.techResourceService.getTechResourceById(id).pipe(
        shareReplay(1)
      );
      this.editedResource.pipe(map((res: TechResource) => {
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
    if (this.isUpdate) {
      this.editedResource.pipe(mergeMap((res: TechResource) => {
        const resourceToSubmit = this.buildUpdatedResource(res);
        return this.techResourceService.updateResource(resourceToSubmit); 
      })).pipe(map(() => 'Updated')).subscribe({
        next: s => {
          this.setResultFromCallback('Update', s);
        },
        error: e => {
          console.error('Update failed in Angular subscription:', e);
          this.setResultFromCallback('Update error', 'Update failed');
        }
      });

    } else {
      const resourceToSubmit = this.buildCreatedResource();
      this.techResourceService.createTechResource(resourceToSubmit)
      .pipe(map((res: TechResource) => {
        if (res.id > 0 ) {
          return 'Created';
        } else {
          return 'Resource creation failed';
        }
      })).subscribe({
        next: s => {
          this.setResultFromCallback('Create', s);
          console.log('Create result mapped to:', s);
          console.log('Component result is now:', this.result);
        },
        error: e => {
          console.error('Create failed in Angular subscription:', e);
          this.setResultFromCallback('Create error', 'Resource creation failed');
        }
      });
    }
  }

  private buildCreatedResource(): TechResource {
    const formData = this.getResourceFormData();
    const createdOn = this.dateTimeService.createdOn();
    const resourceToSubmit = new TechResource(0, formData.title, formData.link, createdOn, TechResourceStatus.New, formData.type);
    resourceToSubmit.tags = [];
    return resourceToSubmit;
  }

  private buildUpdatedResource(res: TechResource): TechResource {
    const formData = this.getResourceFormData();
    const resourceToSubmit = new TechResource(res.id, formData.title, formData.link, res.createdOn, res.status, formData.type);
    resourceToSubmit.tags = res.tags;
    return resourceToSubmit;
  }

  private getResourceFormData(): ResourceFormData {
    const formValue = this.techResourceForm.getRawValue();
    return {
      title: formValue.title,
      link: formValue.link,
      type: TechResourceType[formValue.resourceType],
    };
  }

  private setResultFromCallback(operation: string, result: string) {
    const inAngularZone = NgZone.isInAngularZone();
    console.log(`${operation} callback in Angular zone:`, inAngularZone);
    this.zoneStatus = `zone=${inAngularZone}`;
    this.result = result;
    this.changeDetectorRef.detectChanges();
  }
}

export class FormData {
  title?: string;
  title2?: string;
  link?: string;
  resourceType?: string;
}

type ResourceFormData = {
  title: string;
  link: string;
  type: string;
};
