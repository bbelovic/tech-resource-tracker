import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provide: AuthService, useValue: authService}]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('login component with working login link', () => {
    expect(component).toBeTruthy();
    const loginLink = fixture.debugElement.queryAll(By.css('[data-testid="login-link"]'));
    expect(loginLink).toBeTruthy();
    expect(loginLink.length).toBe(1);
    loginLink[0].triggerEventHandler('click', null);
    expect(authService.login).toHaveBeenCalledTimes(1);    
  });
});
