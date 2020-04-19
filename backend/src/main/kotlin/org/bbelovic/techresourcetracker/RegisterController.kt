package org.bbelovic.techresourcetracker

import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RegisterController {
    @GetMapping("/register", produces = [APPLICATION_JSON_VALUE])
    fun registerUser() = ResponseEntity.ok()
}