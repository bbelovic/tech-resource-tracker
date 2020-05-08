package org.bbelovic.techresourcetracker.user

import com.github.springtestdbunit.DbUnitTestExecutionListener
import com.github.springtestdbunit.annotation.DatabaseSetup
import com.github.springtestdbunit.annotation.ExpectedDatabase
import com.github.springtestdbunit.assertion.DatabaseAssertionMode.NON_STRICT_UNORDERED
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.test.context.TestExecutionListeners
import org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post

@AutoConfigureMockMvc
@SpringBootTest(properties = [
    "spring.datasource.username=postgres",
    "spring.datasource.password=postgres",
    "logging.level.org.hibernate.type.descriptor.sql=trace",
    "spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver",
    "spring.datasource.url=jdbc:tc:postgresql:9.6:///integration_testing?TC_INITSCRIPT=file:src/test/resources/init_database.sql"
])
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = [DbUnitTestExecutionListener::class])
@DatabaseSetup(value = ["/setup-empty-users.xml"])
class RegisterUserControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    @ExpectedDatabase(value = "/expected-users.xml", assertionMode = NON_STRICT_UNORDERED)
    fun `should register new user`() {
        val payload = """
            {"username":"jdoe", "password":"secret", "confirmedPassword":"secret"}
            """.trimIndent()

        mockMvc.post("/register") {
            with(csrf().asHeader())
            contentType = APPLICATION_JSON
            content = payload
        }.andExpect {
            status { isCreated }
            content { string("ok") }
        }
    }

    @Test
    @ExpectedDatabase(value = "/expected-empty-users.xml", assertionMode = NON_STRICT_UNORDERED)
    fun `should reject user registration when password and confirmed password don't match` () {
        val invalidPayload = """
            {"username":"jdoe", "password":"secret", "confirmedPassword":"blabol"}
            """.trimIndent()
        mockMvc.post("/register") {
            with(csrf().asHeader())
            contentType = APPLICATION_JSON
            content = invalidPayload
        }.andExpect {
            status { isBadRequest }
            content { string("error") }
        }
    }
}