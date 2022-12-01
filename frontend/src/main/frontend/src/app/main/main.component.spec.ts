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

  xit('resource list is displayed only for authenticated users', () => {
    expect(component.authenticated.value).toBeFalse();
    let resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBe(null);
    let loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBeTruthy();
    
    authState$.next(true);

    expect(component.authenticated.value).toBeTrue();
    fixture.detectChanges()
    resourceListComponent = findComponent(fixture, 'app-resource-list');
    expect(resourceListComponent).toBeTruthy();
    loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBe(null);

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
