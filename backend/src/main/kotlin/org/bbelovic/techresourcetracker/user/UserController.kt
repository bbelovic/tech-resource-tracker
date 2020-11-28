package org.bbelovic.techresourcetracker.user

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController() {
    @GetMapping("/user")
    fun user(@AuthenticationPrincipal user: OidcUser?): OidcUser? {
        return user
    }
}