import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findComponent } from 'app/shared/test-helper';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('header is always present', () => {
    expect(component.authenticated).toBeFalse();
    const headerComponent = findComponent(fixture, 'app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('resource list is present only when user is authenticated', () => {
    expect(component.authenticated).toBeFalse();
    const listComponent = findComponent(fixture, 'app-resource-list');
    expect(listComponent).toBe(null);
  });

});