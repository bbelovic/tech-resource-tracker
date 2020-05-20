export class UserRegistration {
    username: string
    password: string
    confirmedPassword: string
    constructor(username: string, password: string, confirmedPassword: string) {
        this.username = username
        this.password = password
        this.confirmedPassword = confirmedPassword
    }
}
