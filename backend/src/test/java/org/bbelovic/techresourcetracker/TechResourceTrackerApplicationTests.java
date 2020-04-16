package org.bbelovic.techresourcetracker;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;

@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = NONE)
@SpringBootTest(properties = {
        "spring.datasource.username=postgres",
        "spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver",
        "spring.datasource.url=jdbc:tc:postgresql:9.6:///integration_testing?TC_INITSCRIPT=file:src/test/resources/init_database.sql"
        })
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = DbUnitTestExecutionListener.class)
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-tech-resources.xml")
public class TechResourceTrackerApplicationTests {
    @Test
    public void contextLoads() {
    }
}
