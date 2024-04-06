import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddResourceComponent } from './add-resource.component';
import { TechResourceFormComponent } from 'app/tech-resource-form/tech-resource-form.component';
import { TechResourceService } from 'app/tech-resource-service';
import { findComponent, findEl, fixedDateTimeService, setElementValue } from 'app/shared/test-helper';
import { DateTimeService } from 'app/services/date-time.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TechResource } from 'app/tech-resource';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';

describe('AddResourceComponent', () => {
  let component: AddResourceComponent;
  let fixture: ComponentFixture<AddResourceComponent>;


  const techResource = new TechResource(10, 'some title', 'some link', '', TechResourceStatus.New, TechResourceType.ARTICLE);
  const methodSpies = {getTechResourceById2: of(techResource), postNewTechResource2: of(techResource)}
  const spiedTechResourceService = jasmine.createSpyObj<TechResourceService>('TechResourceService', methodSpies);

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ AddResourceComponent, TechResourceFormComponent ],
      providers: [
        provideRouter([{path: 'edit-tech-resource/:id', component: AddResourceComponent}]),
        {provide: TechResourceService, useValue: spiedTechResourceService},        
        {provide: DateTimeService, useValue: fixedDateTimeService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create component', () => {
    expect(component).toBeTruthy();
    //const techResourceFormComponent = findComponent(fixture, 'app-tech-resource-form');
    //expect(techResourceFormComponent).toBeTruthy();
  });

  xit('should load resource for editing and set it into child component', fakeAsync( async () => {
    
    const harness = await RouterTestingHarness.create();
    const addResourceCmp = await harness.navigateByUrl('edit-tech-resource/123', AddResourceComponent);

    addResourceCmp.editedResource.subscribe(x => console.log(`@@@@@ ==> got [${(x as TechResource).id}]`))

    const formCmp = harness.routeDebugElement.query(By.css('app-tech-resource-form'));

    

    expect(formCmp).toBeTruthy();

    expect(formCmp.componentInstance).toBeTruthy();

    //const titleDebugEl = harness.routeDebugElement.query(By.css(`[data-testid="title"]`));
    const titleDebugEl = formCmp.query(By.css(`[data-testid="title"]`));
    
    const linkDebugEl = harness.routeDebugElement.query(By.css(`[data-testid="link"]`));
    const resourceTypeDebugEl = harness.routeDebugElement.query(By.css(`[data-testid="resource-type"]`));   

    setElementValue(titleDebugEl.nativeElement, 'some title - updated');
    setElementValue(linkDebugEl.nativeElement, 'some link - updated');
    setElementValue(resourceTypeDebugEl.nativeElement, 'Blog');


    const form = findEl(fixture, "form");
    form.triggerEventHandler('submit', {});
    //tick();
    //harness.detectChanges();

    expect(spiedTechResourceService.postNewTechResource2).toHaveBeenCalledTimes(1);
    expect(spiedTechResourceService.postNewTechResource2)
        .toHaveBeenCalledWith(new TechResource(10, 'some title - updated', 'some link - updated', '', TechResourceStatus.New, TechResourceType.BLOG));

    //console.log('@@@ = ' + harness.routeDebugElement.query(By.css(`[data-testid="title"]`)).nativeElement)

  }))
});
