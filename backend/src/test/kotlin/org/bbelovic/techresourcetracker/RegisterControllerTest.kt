package org.bbelovic.techresourcetracker

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post

@AutoConfigureMockMvc
@SpringBootTest
class RegisterControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc
    @Test
    fun `should register new user`() {
        mockMvc.get("/register") {
        }.andExpect {
            status { isOk }
        }
    }
}