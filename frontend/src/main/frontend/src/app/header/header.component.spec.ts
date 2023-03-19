import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/services/auth.service';
import { findEl } from 'app/shared/test-helper';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{provide: AuthService, useValue: authService}]
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
    logoutLink.triggerEventHandler('click', null);
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
