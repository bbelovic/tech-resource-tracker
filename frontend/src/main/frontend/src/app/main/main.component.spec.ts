import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/services/auth.service';
import { findComponent } from 'app/shared/test-helper';
import { BehaviorSubject } from 'rxjs';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authService = jasmine.createSpyObj<AuthService>('AuthService', [], {$authenticationState: new BehaviorSubject<boolean>(false)})

  beforeEach(async () => {
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

  it('resource list is present only when user is authenticated', () => {
    expect(component.authenticated.value).toBeFalse();
    const listComponent = findComponent(fixture, 'app-resource-list');
    expect(listComponent).toBe(null);
    const loginComponent = findComponent(fixture, 'app-login');
    expect(loginComponent).toBeTruthy();
  });

});