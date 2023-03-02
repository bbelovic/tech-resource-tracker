import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { findEl } from 'app/shared/test-helper';
import { TagDTO } from 'app/tag-dto';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';

import { ResourceItemComponent } from './resource-item.component';

describe('ResourceItemComponent', () => {
  let component: ResourceItemComponent;
  let fixture: ComponentFixture<ResourceItemComponent>;
  const testDto = new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java'), new TagDTO(3, 'spring')]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceItemComponent);
    component = fixture.componentInstance;
    component.dto = testDto;
    fixture.detectChanges();

  });

  it('creates with single dto set', () => {
    const expectedDto = new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java'), new TagDTO(3, 'spring')]);
    expect(component.dto).toEqual(expectedDto);
    const debugElement = findEl(fixture, "resource-title");
    const nativeElement = debugElement.nativeElement;
    expect(nativeElement.textContent).toEqual(testDto.title);

    const tagsElement = findEl(fixture, "resource-tags");

    const resourceTagArr = tagsElement.queryAll(By.css(`[data-testid="resource-tag"]`));
    expect(resourceTagArr.length).toEqual(expectedDto.tagDTOs.length);

    resourceTagArr.forEach((debugElement, index) => {
      expect(debugElement.nativeElement.textContent).toEqual(expectedDto.tagDTOs[index].name)   
    });

    const markAsReadBtnElement = findEl(fixture, "mark-as-read-btn");
    expect(markAsReadBtnElement.nativeElement).toBeTruthy();
  });

});
