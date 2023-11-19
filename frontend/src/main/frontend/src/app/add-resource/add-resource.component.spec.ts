import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourceComponent } from './add-resource.component';
import { TechResourceFormComponent } from 'app/tech-resource-form/tech-resource-form.component';
import { TechResourceService } from 'app/tech-resource-service';
import { fakeTechResourceService, findComponent, fixedDateTimeService, setElementValue } from 'app/shared/test-helper';
import { DateTimeService } from 'app/services/date-time.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AddResourceComponent', () => {
  let component: AddResourceComponent;
  let fixture: ComponentFixture<AddResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ AddResourceComponent, TechResourceFormComponent ],
      providers: [
        provideRouter([{path: 'edit-tech-resource/:id', component: AddResourceComponent}]),
        {provide: TechResourceService, useValue: fakeTechResourceService},        
        {provide: DateTimeService, useValue: fixedDateTimeService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    const techResourceFormComponent = findComponent(fixture, 'app-tech-resource-form');
    expect(techResourceFormComponent).toBeTruthy();
  });

  it('should load resource for editing and set it into child component', async () => {
    const harness = await RouterTestingHarness.create();
    const addResourceCmp = await harness.navigateByUrl('edit-tech-resource/123', AddResourceComponent);
    harness.detectChanges();
    /*const actual = await addResourceCmp.editedResource;
    expect(actual).toBeTruthy();
    expect(actual.id).toEqual(123);
    expect(actual.title).toEqual('some title');
    expect(harness.routeNativeElement).toBeTruthy();*/

    const titleDebugEl = harness.routeDebugElement.query(By.css(`[data-testid="title"]`));
    expect(titleDebugEl.nativeElement.value).toEqual('some title');

    const linkDebugEl = harness.routeDebugElement.query(By.css(`[data-testid="link"]`));
    expect(linkDebugEl.nativeElement.value).toEqual('some link');
    
    const resourceTypeDebugEl = harness.routeDebugElement.query(By.css(`[data-testid="resource-type"]`));
    expect(resourceTypeDebugEl.nativeElement.value).toEqual('Article');

    setElementValue(titleDebugEl.nativeElement, 'some title - updated');
    setElementValue(linkDebugEl.nativeElement, 'some link - updated')

    console.log('@@@ = ' + harness.routeDebugElement.query(By.css(`[data-testid="title"]`)).nativeElement)

  });
});
