package org.bbelovic.techresourcetracker;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Base64;

import static org.hamcrest.Matchers.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = NONE)
@SpringBootTest
public class LoginTest {

    private MockMvc mockMvc;

    @Test
    public void should_authenticate_user() throws Exception {
        mockMvc.perform(get("/user")
                .header("Authorization", "Basic "+ Base64.getEncoder().encodeToString("user:passwd".getBytes())))
                .andExpect(jsonPath("$.authenticated", is(true)))
                .andExpect(jsonPath("$.principal.username", equalTo("user")))
                .andExpect(jsonPath("$.principal.password", nullValue()))
                .andExpect(jsonPath("$.authorities.[0].authority", is(equalTo("ROLE_admin"))));
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
