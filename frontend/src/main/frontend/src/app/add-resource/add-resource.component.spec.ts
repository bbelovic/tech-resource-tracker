import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourceComponent } from './add-resource.component';
import { TechResourceService } from 'app/tech-resource-service';
import { fakeTechResourceService, fixedDateTimeService } from 'app/shared/test-helper';
import { DateTimeService } from 'app/services/date-time.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('AddResourceComponent', () => {
  let component: AddResourceComponent;
  let fixture: ComponentFixture<AddResourceComponent>;

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ AddResourceComponent ],
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
  });

  
});
