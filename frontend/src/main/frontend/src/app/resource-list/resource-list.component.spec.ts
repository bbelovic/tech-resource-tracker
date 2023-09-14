import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechResourceService } from 'app/tech-resource-service';
import { ResourceListComponent } from './resource-list.component';
import { ResourceItemComponent } from 'app/resource-item/resource-item.component';
import { fakeTechResourceService, findComponent } from 'app/shared/test-helper';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceListComponent , ResourceItemComponent],
      providers: [
        {provide: TechResourceService, useValue: fakeTechResourceService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component with child component', () => {
    expect(component).toBeTruthy();
    const childComponent = findComponent(fixture, 'app-resource-item');
    expect(childComponent).toBeTruthy();
  });
});
