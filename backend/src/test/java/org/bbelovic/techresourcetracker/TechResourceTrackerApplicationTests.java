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
        "spring.security.oauth2.client.registration.auth0.client-id=test-client-id",
        "spring.security.oauth2.client.registration.auth0.client-secret=test-client-secret",
        "spring.security.oauth2.client.registration.auth0.scope=openid,profile,email",
        "spring.security.oauth2.client.registration.auth0.authorization-grant-type=authorization_code",
        "spring.security.oauth2.client.registration.auth0.redirect-uri={baseUrl}/login/oauth2/code/{registrationId}",
        "spring.security.oauth2.client.provider.auth0.authorization-uri=https://auth.example.test/authorize",
        "spring.security.oauth2.client.provider.auth0.token-uri=https://auth.example.test/oauth/token",
        "spring.security.oauth2.client.provider.auth0.jwk-set-uri=https://auth.example.test/.well-known/jwks.json",
        "spring.security.oauth2.client.provider.auth0.user-info-uri=https://auth.example.test/userinfo",
        "spring.security.oauth2.client.provider.auth0.user-name-attribute=sub",
        "spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://auth.example.test/.well-known/jwks.json",
        "spring.datasource.username=postgres",
        "spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver",
        "spring.datasource.url=jdbc:tc:postgresql:13:///integration_testing?TC_INITSCRIPT=file:src/test/resources/init_database.sql"
        })
@TestExecutionListeners(mergeMode = MERGE_WITH_DEFAULTS, listeners = DbUnitTestExecutionListener.class)
@DatabaseSetup(type = CLEAN_INSERT, value = "/setup-tech-resources.xml")
public class TechResourceTrackerApplicationTests {
    @Test
    public void contextLoads() {
    }
}
