import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechResourceFormComponent } from './tech-resource-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeTechResourceService, findEl, setElementValue } from 'app/shared/test-helper';
import { TechResourceService } from 'app/tech-resource-service';
import { TechResource } from 'app/tech-resource';
import { TechResourceStatus } from 'app/tech-resource-status';
import { TechResourceType } from 'app/tech-resource-type';

describe('TechResourceFormComponent', () => {
  let component: TechResourceFormComponent;
  let fixture: ComponentFixture<TechResourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{provide: TechResourceService, useValue: fakeTechResourceService}],
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
    const form = findEl(fixture, "form");
    form.triggerEventHandler('submit', {});
    expect(fakeTechResourceService.postNewTechResource)
      .toHaveBeenCalledWith(new TechResource(0, 'blabol title', 'blabol link', '', TechResourceStatus.New, TechResourceType.Article));



  });
});
