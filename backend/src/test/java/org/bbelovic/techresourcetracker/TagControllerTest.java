package org.bbelovic.techresourcetracker;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.IfProfileValue;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.web.servlet.MockMvc;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IfProfileValue(name = "test.group", value = "integration")
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = NONE)
@SpringBootTest(properties = {
        "spring.datasource.password=postgres",
        "spring.datasource.username=postgres",
        "spring.datasource.url=jdbc:postgresql://localhost:6432/integration_testing"})
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = DbUnitTestExecutionListener.class)
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-technology-resources-tags.xml")
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-tags.xml")
public class TagControllerTest {

    private static final String TEST_USER = "user";
    private static final String TEST_PASSWORD = "passwd";
    private static final String TEST_ROLE = "admin";
    private static final String CONTENT_TYPE_HEADER_VALUE = "application/json;charset=UTF-8";
    private MockMvc mockMvc;

    @Test
    public void should_return_all_defined_tags() throws Exception {
        mockMvc.perform(get("/tags")
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .accept(CONTENT_TYPE_HEADER_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.parseMediaType(CONTENT_TYPE_HEADER_VALUE)))
                .andExpect((jsonPath("$.length()", is(2))))
                .andExpect(jsonPath("$.[0].name", equalTo("xml")))
                .andExpect(jsonPath("$.[0].id", equalTo(1)))
                .andExpect(jsonPath("$.[1].name", equalTo("javascript")))
                .andExpect(jsonPath("$.[1].id", equalTo(2)));
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
