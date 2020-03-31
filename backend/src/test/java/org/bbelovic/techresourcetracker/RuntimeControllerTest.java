package org.bbelovic.techresourcetracker;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest(properties = {
        "spring.datasource.username=postgres",
        "spring.datasource.url=jdbc:postgresql://localhost:5432/integration_testing"})
public class RuntimeControllerTest {

    private MockMvc mockMvc;
    @MockBean
    private BuildProperties buildProperties;

    @Test
    public void should_return_vendor_information() throws Exception {
        var buildTime = OffsetDateTime.parse("2020-01-01T15:30:00+00:00");

        when(buildProperties.getTime()).thenReturn(buildTime.toInstant());

        var expected = new RuntimeInformation(System.getProperty("java.runtime.name"),
                Runtime.version().feature(), "1-1-2020 @ 15:30");
        mockMvc.perform(get("/runtime"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Type", APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.runtimeName", equalTo(expected.runtimeName())))
                .andExpect(jsonPath("$.feature", equalTo(expected.feature())))
                .andExpect(jsonPath("$.formattedBuildTime", equalTo(expected.formattedBuildTime())));
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
