package org.bbelovic.techresourcetracker;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
public class RuntimeControllerTest {

    private MockMvc mockMvc;

    @Test
    public void should_return_vendor_information() throws Exception {
        var expected = new RuntimeInformation(System.getProperty("java.vendor"), Runtime.version().feature());
        mockMvc.perform(get("/runtime"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Type", APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.vendorName", equalTo(expected.vendorName())))
                .andExpect(jsonPath("$.feature", equalTo(expected.feature())));
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }
}
