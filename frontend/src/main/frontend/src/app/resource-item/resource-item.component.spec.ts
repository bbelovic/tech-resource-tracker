import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findEl } from 'app/shared/test-helper';
import { TagDTO } from 'app/tag-dto';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';

import { ResourceItemComponent } from './resource-item.component';

describe('ResourceItemComponent', () => {
  let component: ResourceItemComponent;
  let fixture: ComponentFixture<ResourceItemComponent>;
  const testDto = new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java')]);

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
    expect(component.dto).toEqual(new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', [new TagDTO(2, 'java')]));
    const debugElement = findEl(fixture, "resource-title");
    const nativeElement = debugElement.nativeElement;
    expect(nativeElement.textContent).toEqual(testDto.title);
    const tagElement = findEl(fixture, "resource-tag");
    expect(tagElement.nativeElement.textContent).toEqual('java');
    const markAsReadBtnElement = findEl(fixture, "mark-as-read-btn");
    expect(markAsReadBtnElement.nativeElement).toBeTruthy();
  });

});
