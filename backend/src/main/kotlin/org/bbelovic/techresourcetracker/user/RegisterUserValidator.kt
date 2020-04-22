package org.bbelovic.techresourcetracker.user

import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator

@Component
class RegisterUserValidator : Validator {
    override fun supports(cls: Class<*>) = (cls == UserDTO::class.java)

    override fun validate(target: Any, errors: Errors) {
        val userDTO = target as UserDTO
        if (userDTO.password != userDTO.confirmedPassword) {
            errors.rejectValue("confirmedPassword", "password and confirmed password don't match")
        }
    }
}
