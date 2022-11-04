import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagDTO } from 'app/tag-dto';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';
import { TechResourceService } from 'app/tech-resource-service';
import { By } from '@angular/platform-browser';


import { ResourceListComponent } from './resource-list.component';
import { ResourceItemComponent } from 'app/resource-item/resource-item.component';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;
  Promise.resolve()
  
  const dtos = Promise.resolve([new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java')])]);
  const spiedResourceService = jasmine.createSpyObj<TechResourceService>('TechResourceService', {getTechResourceDetailsDTO: dtos});
    //['getTechResource','getTechResourceDetailsDTO', 'getTechResourceById', 'postNewTechResource', 'updateResource', 'markResourceAsRead', 'getPagedTechnologyResources']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceListComponent /*, ResourceItemComponent*/],
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
    //spiedResourceService.getTechResourceDetailsDTO.and.returnValue(Promise.resolve(dtos));
    expect(component).toBeTruthy();
    const { debugElement } = fixture;
    const childComponent = debugElement.query(By.directive(ResourceItemComponent));
    //const childComponent = debugElement.query(By.css('resource-item'));
    expect(childComponent).toBeTruthy();
  });
});
