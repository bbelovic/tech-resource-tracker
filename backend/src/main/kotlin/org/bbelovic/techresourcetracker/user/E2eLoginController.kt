package org.bbelovic.techresourcetracker.user

import jakarta.servlet.http.HttpServletRequest
import org.springframework.context.annotation.Profile
import org.springframework.http.ResponseEntity
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.oauth2.core.oidc.OidcIdToken
import org.springframework.security.oauth2.core.oidc.OidcUserInfo
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

@Profile("e2e")
@RestController
class E2eLoginController {

    @PostMapping("/test/login")
    fun login(request: HttpServletRequest): ResponseEntity<Void> {
        val claims = mapOf(
                "sub" to "auth0|e2e-test-user",
                "name" to "E2E Test User",
                "email" to "e2e-test-user@example.com"
        )
        val authorities = listOf(SimpleGrantedAuthority("ROLE_USER"))
        val idToken = OidcIdToken("e2e-test-id-token", Instant.now(), Instant.now().plusSeconds(3600), claims)
        val principal = DefaultOidcUser(authorities, idToken, OidcUserInfo(claims))
        val authentication = OAuth2AuthenticationToken(principal, authorities, "auth0")
        val context = SecurityContextHolder.createEmptyContext()

        context.authentication = authentication
        SecurityContextHolder.setContext(context)
        request.getSession(true).setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                context
        )

        return ResponseEntity.noContent().build()
    }

    @PostMapping("/test/logout")
    fun logout(request: HttpServletRequest): ResponseEntity<Void> {
        SecurityContextHolder.clearContext()
        request.getSession(false)?.invalidate()

        return ResponseEntity.noContent().build()
    }
}
