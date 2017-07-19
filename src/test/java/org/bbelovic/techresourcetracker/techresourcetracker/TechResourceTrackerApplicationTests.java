package org.bbelovic.techresourcetracker.techresourcetracker;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class TechResourceTrackerApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void contextLoads() {
	}

	@Test
	public void test() throws Exception {
		mockMvc.perform(get("/tech-resources1")
				.accept("application/json;charset=UTF-8"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.parseMediaType("application/json;charset=UTF-8")));
	}

}
