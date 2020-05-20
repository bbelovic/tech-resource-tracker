package org.bbelovic.techresourcetracker.user

import org.assertj.core.api.Assertions.assertThat
import org.bbelovic.techresourcetracker.user.entity.User
import org.junit.jupiter.api.Test
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.validation.BeanPropertyBindingResult

class RegisterUserValidatorTest {
    @Test
    fun `should support UserDTO class only`() {
        val validator = RegisterUserValidator()
        assertThat(validator.supports(UserDTO::class.java)).isTrue()
        assertThat(validator.supports(UserDetails::class.java)).isFalse()
        assertThat(validator.supports(User::class.java)).isFalse()
    }

    @Test
    fun `should record error when password and repeated password doesn't match`() {
        val validator = RegisterUserValidator()
        val validationTarget = UserDTO("jdoe", "abc", "xyz")
        val errors = BeanPropertyBindingResult(validationTarget, "")
        validator.validate(validationTarget, errors)
        assertThat(errors.fieldErrorCount).isEqualTo(1)
    }
}