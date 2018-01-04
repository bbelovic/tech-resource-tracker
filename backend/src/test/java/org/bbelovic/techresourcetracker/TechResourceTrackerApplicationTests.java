package org.bbelovic.techresourcetracker;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.IfProfileValue;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static com.github.springtestdbunit.assertion.DatabaseAssertionMode.NON_STRICT_UNORDERED;
import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IfProfileValue(name = "test.group", value = "integration")
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SpringBootTest(properties = {
        "spring.datasource.username=postgres",
        "spring.datasource.url=jdbc:postgresql://localhost:5432/integration_testing"})
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = DbUnitTestExecutionListener.class)
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-tech-resources.xml")
public class TechResourceTrackerApplicationTests {

    private static final String TECH_RESOURCES_BASIC_URI = "/tech-resources";
    private static final String TEST_USER = "user";
    private static final String TEST_PASSWORD = "passwd";
    private static final String TEST_ROLE = "admin";
    private MockMvc mockMvc;

    @Test
    public void contextLoads() {
    }

    @Test
    public void should_return_all_tech_resources_on_get_request() throws Exception {
        final int expectedSize = 10;
        ResultActions actions = mockMvc.perform(get(TECH_RESOURCES_BASIC_URI)
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.parseMediaType("application/json;charset=UTF-8")));
                assertReturnedJsonCollectionContents(actions, expectedSize);

    }

    private void assertReturnedJsonCollectionContents(ResultActions actions, int expectedSize) throws Exception {
        actions.andExpect(jsonPath("$.length()", is(expectedSize)));
        for (int i = 0; i < expectedSize; i++) {
            actions.andExpect(jsonPath(String.format("$.[%d].id", i), greaterThan(0)))
                .andExpect(jsonPath(String.format("$.[%d].title", i), equalTo("Some title " + i)))
                .andExpect(jsonPath(String.format("$.[%d].link", i), equalTo("https://www.abc.com")));
        }
    }

    @Test
    @ExpectedDatabase(assertionMode = NON_STRICT_UNORDERED, value = "/expected-tech-resources.xml")
    public void should_create_new_resource_post_request() throws Exception {
        String requestPayload = "{\"id\":0,\"title\":\"new title\",\"link\":\"http://www.blabol.com\"}";
        mockMvc.perform(post(TECH_RESOURCES_BASIC_URI)
                .with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header("Content-Type", "application/json;charset=UTF-8")
                .content(requestPayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", greaterThan(0)))
                .andExpect(jsonPath("$.title", is("new title")))
                .andExpect(jsonPath("$.link", is("http://www.blabol.com")));

    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
