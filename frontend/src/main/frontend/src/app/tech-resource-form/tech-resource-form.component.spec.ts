import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechResourceFormComponent } from './tech-resource-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { findEl, fixedDateTimeService, setElementValue } from 'app/shared/test-helper';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResource } from 'app/tech-resource';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';
import { DateTimeService } from 'app/services/date-time.service';

describe('TechResourceFormComponent', () => {
  let component: TechResourceFormComponent;
  let fixture: ComponentFixture<TechResourceFormComponent>;
  let techResourceService: jasmine.SpyObj<TechResourceService>;

  const expectedDate = '2222-01-01T10:00:00';
    const expectedResource = new TechResource(0, 'blabol title', 'blabol link', expectedDate, TechResourceStatus.New, TechResourceType.Article);
    expectedResource.tags = [];

  beforeEach(async () => {
    const responseResource = new TechResource(1, 
      expectedResource.title, expectedResource.link, expectedDate, expectedResource.status, expectedResource.type);

    const mockedMethods = {'postNewTechResource': Promise.resolve(responseResource)}


    techResourceService = jasmine.createSpyObj<TechResourceService>('TechResourceService', 
      mockedMethods);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{provide: TechResourceService, useValue: techResourceService}, {provide: DateTimeService, useValue: fixedDateTimeService}],
      declarations: [ TechResourceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create tech resource form component', () => {
    expect(component).toBeTruthy();
  });

  it('tech resource form successful submission', async () => {
    const titleEl = findEl(fixture, "title").nativeElement;   
    setElementValue(titleEl, "blabol title");
    const linkEl = findEl(fixture, "link").nativeElement;
    setElementValue(linkEl, "blabol link");
    const resourceTypeEl = findEl(fixture, "resource-type").nativeElement;
    setElementValue(resourceTypeEl, "Article");
    const form = findEl(fixture, "form");
    form.triggerEventHandler('submit', {});
    fixture.detectChanges();

    expect(techResourceService.postNewTechResource)
      .toHaveBeenCalledWith(expectedResource);

    const resourceId = (await component.submittedResource).id;
    expect(resourceId).toEqual(1);

    const successMessage = findEl(fixture, "result-message");
    expect(successMessage).toBeTruthy();
    expect(successMessage.nativeElement.textContent).toEqual('Success');
  });
});
