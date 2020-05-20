package org.bbelovic.techresourcetracker.user

import org.bbelovic.techresourcetracker.user.entity.User
import org.bbelovic.techresourcetracker.user.service.DefaultUserDetailsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.CREATED
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.WebDataBinder
import org.springframework.web.bind.annotation.InitBinder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class RegisterUserController(@Autowired val userDetailsService: DefaultUserDetailsService,
    @Autowired val validator: RegisterUserValidator) {

    @InitBinder
    fun initBinder(binder: WebDataBinder) {
        binder.addValidators(validator)
    }

    @PostMapping("/register", produces = [APPLICATION_JSON_VALUE])
    fun registerUser(@Validated @RequestBody userDTO: UserDTO, result: BindingResult): ResponseEntity<RegistrationResponseDTO> {
        val user = User()
        user.username = userDTO.username
        user.password = userDTO.password

        if (result.hasErrors()) {
            val message = "User registration failed."
            return ResponseEntity(RegistrationResponseDTO(message, true), BAD_REQUEST)
        }
        userDetailsService.registerUser(user)
        val message = "New user [${user.username}] registered."
        return ResponseEntity(RegistrationResponseDTO(message, false), CREATED)
    }
}

data class UserDTO(val username: String, val password: String, val confirmedPassword: String)
data class RegistrationResponseDTO(val resultMessage: String, val error: Boolean)