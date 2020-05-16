import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { RegisterUserService } from 'app/services/register-user.service';
import { RegisterUserServiceStub } from 'app/shared/register-user-service-stub';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RegistrationResponse } from 'app/shared/registration-response';

describe('RegisterUserComponent', () => {
   let component: RegisterUserComponent;
   let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      providers: [{provide: RegisterUserService, useValue: new RegisterUserServiceStub()}]
    })
    .compileComponents();
  }));

   beforeEach(() => {
     fixture = TestBed.createComponent(RegisterUserComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

  it('should create component', () => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
    expect(component.result).toEqual('');
    const alerts = fixture.debugElement.queryAll(By.css('alert'));
    expect(alerts).toEqual([])
  });

  it('should display success message upon succesful user registration', () => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.debugElement.componentInstance;
    const result = 'OK';
    const response = new RegistrationResponse();
    response.result = result;
    const service = fixture.debugElement.injector.get(RegisterUserService);
    const obs = new Observable<RegistrationResponse>(subscriber => {subscriber.next(response)});
    spyOn(service, 'registerNewUser').and.returnValue(obs);


    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {});

    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.alert-success'))
    expect(component.formSubmitted).toBeTrue()
    expect(alert.nativeElement.innerText).toEqual(result)

  });
});
