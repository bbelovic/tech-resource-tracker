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
import org.springframework.test.annotation.IfProfileValue;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static com.github.springtestdbunit.assertion.DatabaseAssertionMode.NON_STRICT_UNORDERED;
import static java.lang.String.format;
import static java.util.Arrays.asList;
import static org.bbelovic.techresourcetracker.TechnologyResourceStatus.NEW;
import static org.bbelovic.techresourcetracker.TechnologyResourceType.ARTICLE;
import static org.bbelovic.techresourcetracker.TechnologyResourceType.PRESENTATION;
import static org.hamcrest.Matchers.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IfProfileValue(name = "test.group", value = "integration")
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = NONE)
@SpringBootTest(properties = {
        "spring.datasource.username=postgres",
        "logging.level.org.hibernate.type.descriptor.sql=trace",
        "spring.datasource.url=jdbc:postgresql://localhost:5432/integration_testing"})
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = DbUnitTestExecutionListener.class)
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-tech-resources.xml")
public class TechResourceControllerTest {

    private static final Logger log = LoggerFactory.getLogger(TechResourceControllerTest.class);
    private static final String TECH_RESOURCES_BASIC_URI = "/tech-resources";
    private static final String TEST_USER = "user";
    private static final String TEST_PASSWORD = "passwd";
    private static final String TEST_ROLE = "admin";
    private static final String CONTENT_TYPE_HEADER_NAME = "Content-Type";
    private static final String CONTENT_TYPE_HEADER_VALUE = "application/json;charset=UTF-8";

    private MockMvc mockMvc;

    @Test
    public void should_return_top_10_tech_resource_details_ordered_by_creation_date() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(TECH_RESOURCES_BASIC_URI)
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .accept(CONTENT_TYPE_HEADER_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE_HEADER_VALUE))
                .andExpect(jsonPath("$.length()", is(10)))
                .andExpect(jsonPath("$.[0].id", greaterThan(0)))
                .andExpect(jsonPath("$.[0].title", is("Some title 12")))
                .andExpect(jsonPath("$.[0].link", is("https://www.abc.com")))
                .andExpect(jsonPath("$.[0].tagDTOs", hasSize(2)))
                .andExpect(jsonPath("$.[0].tagDTOs.[0].name", equalTo("java")))
                .andExpect(jsonPath("$.[0].tagDTOs.[1].name", equalTo("kotlin")));
    }

    @Test
    @ExpectedDatabase(assertionMode = NON_STRICT_UNORDERED, value = "/expected-tech-resources.xml")
    public void should_create_new_resource_post_request() throws Exception {
        String requestPayload =
                "{\"id\":0,\"title\":\"new title\"" +
                        ",\"link\":\"http://www.blabol.com\", " +
                        "\"createdOn\":\"2018-01-01T10:20:30\", \"status\":\"NEW\", \"type\":\"PRESENTATION\", " +
                        "\"tags\":[{\"id\":0, \"name\":\"javascript\"}]}";
        mockMvc.perform(post(TECH_RESOURCES_BASIC_URI)
                .with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_HEADER_VALUE)
                .content(requestPayload))
                .andDo(result -> log.info("Response: [{}].", result.getResponse().getContentAsString()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", greaterThan(0)))
                .andExpect(jsonPath("$.title", is("new title")))
                .andExpect(jsonPath("$.link", is("http://www.blabol.com")))
                .andExpect(jsonPath("$.createdOn", equalTo("2018-01-01T10:20:30")))
                .andExpect(jsonPath("$.status", equalTo(NEW.name())))
                .andExpect(jsonPath("$.type", equalTo(PRESENTATION.name())))
                .andExpect(jsonPath("$.tags", hasSize(1)))
                .andExpect(jsonPath("$.tags.[0].id", greaterThan(0)))
                .andExpect(jsonPath("$.tags.[0].name", equalTo("javascript")));
    }

    @Test
    @ExpectedDatabase(assertionMode = NON_STRICT_UNORDERED, value= "/expected-tech-resources-after-update.xml")
    public void should_update_existing_tech_resource() {
        requestPayloads().forEach(requestPayload -> {
            try {
                mockMvc.perform(put(TECH_RESOURCES_BASIC_URI)
                        .with(csrf().asHeader())
                        .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                        .header(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_HEADER_VALUE)
                        .content(requestPayload))
                        .andDo(result -> log.info("Response: [{}].", result.getResponse().getContentAsString()))
                        .andExpect(status().isNoContent());
            } catch (Exception e) {
                log.error("Unexpected exception in test.", e);
            }
        });
    }

    private List<String> requestPayloads() {
        return Arrays.asList("{\"id\":2,\"title\":\"title2 (updated)\"" +
                        ",\"link\":\"http://www.updated.blabol2.com\", " +
                        "\"createdOn\":\"2018-01-01T10:10:10\", \"status\":\"PROCESSED\", \"type\":\"BLOG\", " +
                        "\"tags\":[{\"id\":2,\"name\":\"kotlin\"}]}",

                "{\"id\":3,\"title\":\"title3 (updated)\"" +
                        ",\"link\":\"http://www.updated.blabol3.com\", " +
                        "\"createdOn\":\"2018-02-02T20:20:20\", \"status\":\"PROCESSED\", \"type\":\"BLOG\", " +
                        "\"tags\":[{\"id\":2,\"name\":\"kotlin\"}, {\"id\":1,\"name\":\"java\"}]}"
        );
    }

    @Test
    @DatabaseSetup(type = CLEAN_INSERT, value= "/setup-mark-as-read-resource.xml")
    @ExpectedDatabase(assertionMode = NON_STRICT_UNORDERED, value= "/expected-mark-as-read-resource.xml")
    public void should_mark_tech_resource_as_read() throws Exception {
        String requestPayload =
                "{\"id\":1,\"title\":\"new title\"" +
                        ",\"link\":\"http://www.blabol.com\", " +
                        "\"createdOn\":\"2018-01-01T10:20:30\", \"status\":\"PROCESSED\", \"type\":\"BLOG\", " +
                        "\"tags\":[]}";
        mockMvc.perform(put("/markAsRead/1").with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_HEADER_VALUE)
                .content(requestPayload))
                .andExpect(status().isNoContent());
    }

    @Test
    public void should_return_technology_resource_by_its_id() throws Exception {
        mockMvc.perform(get("/tech-resources/12")
                .with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_HEADER_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(12)))
                .andExpect(jsonPath("$.title", equalTo("Some title 12")))
                .andExpect(jsonPath("$.link", equalTo("https://www.abc.com")))
                .andExpect(jsonPath("$.createdOn", equalTo("2018-01-01T00:12:00")))
                .andExpect(jsonPath("$.status", equalTo(NEW.name())))
                .andExpect(jsonPath("$.type", equalTo(ARTICLE.name())))
                .andExpect(jsonPath("$.tags", hasSize(2)))
                .andExpect(jsonPath("$.tags.[0].id", equalTo(1)))
                .andExpect(jsonPath("$.tags.[0].name", equalTo("java")));
    }

    @Test
    public void should_return_404_not_found_status_when_resource_cant_be_found_by_id() throws Exception {
        mockMvc.perform(get("/tech-resources/20")
                .with(csrf().asHeader())
                .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                .header(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_HEADER_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    public void
    should_load_next_page_of_resources_upon_request() throws Exception {
        List<List<Integer>> expectedResourceTitleIds = asList(asList(12, 10, 8, 7),
                asList(6, 5, 4, 3), asList(2, 1));
        assertPagedResources(expectedResourceTitleIds);

    }

    private void assertPagedResources(List<List<Integer>> expectedResourceTitleIds) throws Exception {
        for (int i = 0; i < expectedResourceTitleIds.size(); i++) {
            List<Integer> titleIds = expectedResourceTitleIds.get(i);
            String urlTemplate = format("/tech-resources/page/%d/pageSize/%d", i, 4);
            ResultActions resultActions = mockMvc.perform(get(urlTemplate)
                    .with(csrf().asHeader())
                    .with(user(TEST_USER).password(TEST_PASSWORD).roles(TEST_ROLE))
                    .header(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_HEADER_VALUE))
                    .andDo(response -> log.info("Result: [{}]", response.getResponse().getContentAsString()))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()", is(titleIds.size())));
            for (int j = 0; j < titleIds.size(); j++) {
                resultActions.andExpect(jsonPath("$.["+ j +"].id", is(titleIds.get(j))));
                resultActions.andExpect(jsonPath("$.["+ j +"].title", is("Some title " + titleIds.get(j))));
                resultActions.andExpect(jsonPath("$.["+ j +"].link", is("https://www.abc.com")));
            }

        }
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
