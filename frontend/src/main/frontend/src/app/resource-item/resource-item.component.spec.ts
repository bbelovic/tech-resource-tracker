import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';

import { ResourceItemComponent } from './resource-item.component';

describe('ResourceItemComponent', () => {
  let component: ResourceItemComponent;
  let fixture: ComponentFixture<ResourceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemComponent, TestHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component(
    
  )
  class TestHostComponent {
    dtos: TechResourceDetailsDTO[]
    constructor() {
      this.dtos = [new TechResourceDetailsDTO(1, 'title1', 'http://blabol.com', [])];
    }
  }
});
