package org.bbelovic.techresourcetracker;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import java.time.LocalDateTime;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static com.github.springtestdbunit.assertion.DatabaseAssertionMode.NON_STRICT_UNORDERED;
import static java.lang.String.format;
import static java.time.ZoneOffset.UTC;
import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    private static final Logger log = LoggerFactory.getLogger(TechResourceTrackerApplicationTests.class);

    private static final String TECH_RESOURCES_BASIC_URI = "/tech-resources";
    private static final String TEST_USER = "user";
    private static final String TEST_PASSWORD = "passwd";
    private static final String TEST_ROLE = "admin";
    private MockMvc mockMvc;

    @Test
    public void contextLoads() {
    }

    @Test
    public void should_return_top_ten_new_tech_resources() throws Exception {
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
        LocalDateTime.of(2018, 1, 1, 0, 0, 0).toInstant(UTC);
        for (int i = 0; i < expectedSize; i++) {
            actions.andExpect(jsonPath(format("$.[%d].id", i), greaterThan(0)))
                .andExpect(jsonPath(format("$.[%d].status", i), equalTo("NEW")));
        }
    }

    @Test
    @ExpectedDatabase(assertionMode = NON_STRICT_UNORDERED, value = "/expected-tech-resources.xml")
    public void should_create_new_resource_post_request() throws Exception {
        String requestPayload =
                "{\"id\":0,\"title\":\"new title\"" +
                        ",\"link\":\"http://www.blabol.com\", " +
                        "\"createdOn\":\"2018-01-01T10:20:30\", \"status\":\"NEW\"}";
        mockMvc.perform(post(TECH_RESOURCES_BASIC_URI)
                .with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header("Content-Type", "application/json;charset=UTF-8")
                .content(requestPayload))
                .andDo(result -> log.info("Response: [{}].", result.getResponse().getContentAsString()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", greaterThan(0)))
                .andExpect(jsonPath("$.title", is("new title")))
                .andExpect(jsonPath("$.link", is("http://www.blabol.com")))
                .andExpect(jsonPath("$.createdOn", equalTo("2018-01-01T10:20:30")))
                .andExpect(jsonPath("$.status", equalTo("NEW")));

    }

    @Test
    @DatabaseSetup(type = CLEAN_INSERT, value= "/setup-tech-resource-for-update.xml")
    @ExpectedDatabase(assertionMode = NON_STRICT_UNORDERED, value= "/expected-tech-resource-after-update.xml")
    public void should_mark_resource_as_processed() throws Exception {
        String requestPayload =
                "{\"id\":2,\"title\":\"new title (updated)\"" +
                        ",\"link\":\"http://www.updated.blabol.com\", " +
                        "\"createdOn\":\"2018-02-02T20:00:00\", \"status\":\"PROCESSED\"}";
        mockMvc.perform(put(TECH_RESOURCES_BASIC_URI)
                .with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header("Content-Type", "application/json;charset=UTF-8")
                .content(requestPayload))
                .andExpect(status().isNoContent());
    }


    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
