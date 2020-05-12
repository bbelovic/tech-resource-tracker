import { UserRegistration } from './user-registration';
import { Observable } from 'rxjs';

export class RegisterUserServiceStub {
    registerNewUser(userRegistration: UserRegistration): Observable<string> {
        return new Observable<string>()
    }
}
