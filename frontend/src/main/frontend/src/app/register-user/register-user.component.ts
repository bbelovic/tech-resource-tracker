import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from 'app/services/register-user.service';
import { UserRegistration } from 'app/shared/user-registration';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  private result: string

  constructor(private registrationService: RegisterUserService) { }

  ngOnInit() {
  }

  createNewUser(username: string, password: string, confirmedPassword: string) {
    const user = new UserRegistration(username, password, confirmedPassword)
    this.registrationService.registerNewUser(user)
      .subscribe(resp => this.result = resp)
  }
}
