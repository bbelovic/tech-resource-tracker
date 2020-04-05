package org.bbelovic.techresourcetracker;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Base64;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static java.lang.String.format;
import static org.hamcrest.Matchers.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = NONE)
@SpringBootTest(properties = {
        "spring.datasource.username=postgres",
        "logging.level.org.hibernate.type.descriptor.sql=trace",
        "logging.level.org.hibernate.SQL=debug",
        "spring.datasource.url=jdbc:postgresql://localhost:5432/integration_testing"})
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = DbUnitTestExecutionListener.class)
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-users.xml")
public class LoginTest {

    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    private static final String TEST_USERNAME = "user";
    private static final String TEST_PASSWORD = "passwd";
    private static final byte[] AUTHORIZATION_HEADER_VALUE_BYTES = format("%s:%s", TEST_USERNAME, TEST_PASSWORD).getBytes();
    private static final String AUTHORIZATION_HEADER_VALUE = "Basic "+ Base64.getEncoder().encodeToString(AUTHORIZATION_HEADER_VALUE_BYTES);
    public static final String USER_URI = "/user";
    private MockMvc mockMvc;

    @Test
    public void should_authenticate_user() throws Exception {
        mockMvc.perform(get(USER_URI)
                .header(AUTHORIZATION_HEADER_NAME, AUTHORIZATION_HEADER_VALUE))
                .andExpect(jsonPath("$.authenticated", is(true)))
                .andExpect(jsonPath("$.principal.username", is(equalTo(TEST_USERNAME))))
                .andExpect(jsonPath("$.principal.password", is(equalTo(TEST_PASSWORD))))
                .andExpect(jsonPath("$.authorities.[0].authority", is(equalTo("admin"))));
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
