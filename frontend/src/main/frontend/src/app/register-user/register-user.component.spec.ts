import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { RegisterUserService } from 'app/services/register-user.service';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RegistrationResponse } from 'app/shared/registration-response';

describe('RegisterUserComponent', () => {
   let component: RegisterUserComponent;
   let fixture: ComponentFixture<RegisterUserComponent>;
   let registerUserService: jasmine.SpyObj<RegisterUserService>;

   const testParameters = [
    {description: 'should display success message upon succesful user registration',
      elementClass: '.alert-success', registrationResponse: success()},
    {description: 'should display error message upon unsuccesful user registration',
      elementClass: '.alert-danger', registrationResponse: failure()}
  ]

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('RegisterUserService', ['registerNewUser']);
    TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      providers: [{provide: RegisterUserService, useValue: spy}]
    })
    .compileComponents();
    registerUserService = TestBed.inject(RegisterUserService) as jasmine.SpyObj<RegisterUserService>;
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
    expect(component.alertClass).toEqual('');
    const alerts = fixture.debugElement.queryAll(By.css('alert'));
    expect(alerts).toEqual([])
  });

  testParameters.forEach((parameter) => {
    it(parameter.description, () => {
      fixture = TestBed.createComponent(RegisterUserComponent);
      component = fixture.debugElement.componentInstance;

      const response = parameter.registrationResponse;
      const obs = new Observable<RegistrationResponse>(subscriber => {subscriber.next(response)});
      registerUserService.registerNewUser.and.returnValue(obs);

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', {});

      fixture.detectChanges();
      const alert = fixture.debugElement.query(By.css(parameter.elementClass))
      expect(component.formSubmitted).toBeTrue()
      expect(alert.nativeElement.innerText).toContain(parameter.registrationResponse.resultMessage)
    });
  });

  it('should be able to dismiss user registration alert', () => {
    fixture = TestBed.createComponent(RegisterUserComponent);
      component = fixture.debugElement.componentInstance;

      const response = success();
      const obs = new Observable<RegistrationResponse>(subscriber => {subscriber.next(response)});
      registerUserService.registerNewUser.and.returnValue(obs);

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', {});

      fixture.detectChanges();
      const alert = fixture.debugElement.query(By.css('.alert'));
      const a = alert.query(By.css('a'))
      a.triggerEventHandler('click', {})

      fixture.detectChanges()
      expect(component.result).toEqual('')
      expect(component.formSubmitted).toBeFalse()
      expect(component.alertClass).toEqual('')
  });

  function success() {
    const result = new RegistrationResponse();
    result.error = false;
    result.resultMessage = 'registration succeeded';
    return result
  }

  function failure() {
   const result = new RegistrationResponse();
   result.error = true;
   result.resultMessage = 'registration failed';
   return result
  }

});
