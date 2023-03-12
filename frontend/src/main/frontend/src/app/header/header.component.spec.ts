import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findEl } from 'app/shared/test-helper';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header with menu', () => {
    expect(component).toBeTruthy();

    const appMenu = findEl(fixture, 'app-menu');
    expect(appMenu).toBeTruthy();
    expect(appMenu.childNodes.length).toBe(3);
    const logoutLink = findEl(fixture, 'logout-link');
    expect(logoutLink).toBeTruthy();
  });
});
