import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from 'app/services/register-user.service';
import { UserRegistration } from 'app/shared/user-registration';
import { RegistrationResponse } from 'app/shared/registration-response';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
   result = ''
   formSubmitted = false;
   alertClass = ''

  constructor(private registrationService: RegisterUserService) { }

  ngOnInit() {
  }

  createNewUser(username: string, password: string, confirmedPassword: string) {
    const user = new UserRegistration(username, password, confirmedPassword)
    this.registrationService.registerNewUser(user)
      .subscribe(resp => this.showAlert(resp))
  }

  resetAlert() {
    this.result = '';
    this.alertClass = '';
    this.formSubmitted = false;
  }

  private showAlert(response: RegistrationResponse) {
    this.formSubmitted = true
    this.alertClass = response.error ? 'alert alert-danger alert-dismissible' : 'alert alert-success alert-dismissible'
    this.result = response.resultMessage
  }
}
