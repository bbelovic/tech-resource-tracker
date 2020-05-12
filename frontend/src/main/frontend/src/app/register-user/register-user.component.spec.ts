import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { RegisterUserService } from 'app/services/register-user.service';
import { RegisterUserServiceStub } from 'app/shared/register-user-service-stub';
import { Observable } from 'rxjs';

describe('RegisterUserComponent', () => {
  // let component: RegisterUserComponent;
  // let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      providers: [{provide: RegisterUserService, useValue: new RegisterUserServiceStub()}]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
    // fixture = TestBed.createComponent(RegisterUserComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  // });

  it('should create', async(() => {
    const fixture = TestBed.createComponent(RegisterUserComponent);
    const component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy();
  }));

  it('should display success message upon succesful user registration', async(() => {
    const fixture = TestBed.createComponent(RegisterUserComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(RegisterUserService);
    const obs = new Observable<string>(subscriber => {subscriber.next('success')});
    spyOn(service, 'registerNewUser').and.returnValue(obs)

    const compiled = fixture.debugElement.nativeElement
    const button = compiled.querySelector('button')
    button.click()

    fixture.detectChanges()
    expect(component.result).toEqual('success')
  }));
});
