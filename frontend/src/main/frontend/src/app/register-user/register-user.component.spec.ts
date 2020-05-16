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

   const parameters = [
    {description: 'should display success message upon succesful user registration',
      elementClass: '.alert-success', responseMessage: 'OK'},
    {description: 'should display error message upon unsuccesful user registration',
      elementClass: '.alert-danger', responseMessage: 'ERROR'}
  ]

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

  parameters.forEach((parameter) => {
    it(parameter.description, () => {
      fixture = TestBed.createComponent(RegisterUserComponent);
      component = fixture.debugElement.componentInstance;

      const response = new RegistrationResponse();
      response.result = parameter.responseMessage;
      const service = fixture.debugElement.injector.get(RegisterUserService);
      const obs = new Observable<RegistrationResponse>(subscriber => {subscriber.next(response)});
      spyOn(service, 'registerNewUser').and.returnValue(obs);

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', {});

      fixture.detectChanges();
      const alert = fixture.debugElement.query(By.css(parameter.elementClass))
      expect(component.formSubmitted).toBeTrue()
      expect(alert.nativeElement.innerText).toEqual(parameter.responseMessage)

    });
  });

});
