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

  beforeEach(async () => {
    authState$ = new BehaviorSubject<boolean>(false);
    const authService = jasmine.createSpyObj<AuthService>('AuthService', [], {$authenticationState: authState$});
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

  it('header is always present', () => {
    expect(component.authenticated.value).toBeFalse();
    const headerComponent = findComponent(fixture, 'app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('resource list is not present when user is not authenticated', () => {
    expect(component.authenticated.value).toBeFalse();
    const resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBe(null);
    const loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBeTruthy();
  });

  it('resource list is present when user is authenticated', () => {
    authState$.next(true);
    fixture.detectChanges();
    expect(component.authenticated.value).toBeTrue();
    const resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBeTruthy();
    const loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBe(null);
  });

});
