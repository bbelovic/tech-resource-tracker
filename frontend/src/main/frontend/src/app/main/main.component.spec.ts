import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/services/auth.service';
import { findComponent } from 'app/shared/test-helper';
import { BehaviorSubject } from 'rxjs';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authState$: BehaviorSubject<boolean>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authState$ = new BehaviorSubject<boolean>(true);
    authService = jasmine.createSpyObj<AuthService>('AuthService', {handleLogin: authState$.toPromise()}, {$authenticationState: authState$});
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{provide: AuthService, useValue: authService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('header and resource list is present when user is authenticated', () => {
    expect(component.authenticated.value).toBeTrue();
    const headerComponent = findComponent(fixture, 'app-header');
    expect(headerComponent).toBeTruthy();
    const resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBeTruthy();
    const loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBe(null);
    expect(authService.handleLogin).toHaveBeenCalledTimes(1);
  });
});

describe('MainComponent negative', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authState$: BehaviorSubject<boolean>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authState$ = new BehaviorSubject<boolean>(false);
    authService = jasmine.createSpyObj<AuthService>('AuthService', {handleLogin: authState$.toPromise()}, {$authenticationState: authState$});
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{provide: AuthService, useValue: authService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('header and resource list is not present when user is not authenticated', () => {
    expect(component.authenticated.value).toBeFalse();
    const resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBe(null);
    const headerComponent = findComponent(fixture, 'app-header');
    expect(headerComponent).toBe(null);
    const loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBeTruthy();
    expect(authService.handleLogin).toHaveBeenCalledTimes(1);
  });
});