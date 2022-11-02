import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechResourceService } from 'app/tech-resource-service';
import { of } from 'rxjs';


import { ResourceListComponent } from './resource-list.component';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;
  const spiedResourceService = jasmine.createSpyObj<TechResourceService>('TechResourceService', {getTechResourceDetailsDTO: Promise.resolve([])})

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceListComponent ],
      providers: [
        {provide: TechResourceService, useValue: spiedResourceService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });
});
