import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechResourceFormComponent } from './tech-resource-form.component';

describe('TechResourceFormComponent', () => {
  let component: TechResourceFormComponent;
  let fixture: ComponentFixture<TechResourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechResourceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
