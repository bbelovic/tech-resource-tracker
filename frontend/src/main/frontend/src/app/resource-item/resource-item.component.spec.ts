import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    const debugElement = fixture.debugElement.query(By.css(`[data-testid="resource-title"]`));
    const nativeElement = debugElement.nativeElement;
    expect(nativeElement.textContent).toEqual(testDto.title);
    const tagElement = fixture.debugElement.query(By.css(`[data-testid="resource-tag"]`));
    expect(tagElement.nativeElement.textContent).toEqual('java');
    const markAsReadBtnElement = fixture.debugElement.query(By.css(`[data-testid="mark-as-read-btn"]`));
    expect(markAsReadBtnElement.nativeElement).toBeTruthy();
  });

});
