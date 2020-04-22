package org.bbelovic.techresourcetracker.user

import org.bbelovic.techresourcetracker.user.entity.User
import org.bbelovic.techresourcetracker.user.service.DefaultUserDetailsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class RegisterUserController {
    @Autowired
    lateinit var userDetailsService: DefaultUserDetailsService
    @PostMapping("/register", produces = [APPLICATION_JSON_VALUE])
    fun registerUser(@RequestBody userDTO: UserDTO): ResponseEntity<String> {
        val user = User()
        user.username = userDTO.username
        user.password = userDTO.password
        userDetailsService.registerUser(user)
        return ResponseEntity("xxx",HttpStatus.CREATED)
    }
}

data class UserDTO(val username: String, val password: String, val passwordRepeated: String)