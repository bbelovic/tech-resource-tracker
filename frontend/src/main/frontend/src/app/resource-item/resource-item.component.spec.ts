import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechResourceDetailsDTO } from 'app/tech-resource-details-dto';

import { ResourceItemComponent } from './resource-item.component';

describe('ResourceItemComponent', () => {
  let component: ResourceItemComponent;
  let fixture: ComponentFixture<ResourceItemComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemComponent, TestHostComponent ]
    })
    .compileComponents();

    
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.testDto = new TechResourceDetailsDTO(1, 'title1', 'http://blabol.com', []);
    testHostFixture.detectChanges();

    
    //fixture = TestBed.createComponent(ResourceItemComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();

  });

  it('should create', () => {
    expect(testHostFixture.nativeElement.querySelector('h1').innerText).toEqual('title1');
    //expect(component.dto).toBeUndefined();
  });

  @Component({
    selector: `test-host-component`,
    template: `<app-resource-item [dto]="testDto"></app-resource-item>`
  })
  class TestHostComponent {
    testDto: TechResourceDetailsDTO;
    constructor() {
      //this.testDto = new TechResourceDetailsDTO(1, 'title1', 'http://blabol.com', []);
    }
  }
});
