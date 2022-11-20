import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async() => {
    const authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
