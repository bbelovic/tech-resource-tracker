import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';

import { ResourceItemComponent } from './resource-item.component';

describe('ResourceItemComponent', () => {
  let component: ResourceItemComponent;
  let fixture: ComponentFixture<ResourceItemComponent>;
  // let testHostComponent: TestHostComponent;
  // let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceItemComponent);
    component = fixture.componentInstance;
    component.dto = new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', []);
    fixture.detectChanges();

  });

  it('should create with single dto set', () => {
    expect(component.dto).toEqual(new TechResourceDetailsDTO(1, 'test title', 'https://abc.com', []));
  });

});
