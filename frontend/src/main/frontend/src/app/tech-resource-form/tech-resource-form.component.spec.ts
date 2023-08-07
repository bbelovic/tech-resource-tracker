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

  beforeEach(async () => {
    techResourceService = jasmine.createSpyObj<TechResourceService>('TechResourceService', 
      [
        'postNewTechResource'
      ]);
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

  it('tech resource form successful submission', () => {
    const titleEl = findEl(fixture, "title").nativeElement;   
    setElementValue(titleEl, "blabol title");
    const linkEl = findEl(fixture, "link").nativeElement;
    setElementValue(linkEl, "blabol link");
    const resourceTypeEl = findEl(fixture, "resource-type").nativeElement;
    setElementValue(resourceTypeEl, "Article");
    const form = findEl(fixture, "form");
    form.triggerEventHandler('submit', {});
    fixture.detectChanges();



    const expectedDate = '2222-01-01T10:00:00';
    const expectedResource = new TechResource(0, 'blabol title', 'blabol link', expectedDate, TechResourceStatus.New, TechResourceType.Article);
    expectedResource.tags = [];

    expect(techResourceService.postNewTechResource)
      .toHaveBeenCalledWith(expectedResource);

    expect(component.showMessage).toEqual(true);
    expect(component.message).toEqual('Resource submitted');
  });
});
