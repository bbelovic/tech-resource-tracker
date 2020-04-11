package org.bbelovic.techresourcetracker;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.MatcherAssert;
import org.hamcrest.TypeSafeMatcher;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Base64;

import static com.github.springtestdbunit.annotation.DatabaseOperation.CLEAN_INSERT;
import static java.lang.String.format;
import static org.bbelovic.techresourcetracker.LoginTest.BCryptMatcher.bcrypt;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.number.BigDecimalCloseTo.closeTo;
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
    private PasswordEncoder passwordEncoder;

    @Test
    public void should_authenticate_user() throws Exception {
        mockMvc.perform(get(USER_URI)
                .header(AUTHORIZATION_HEADER_NAME, AUTHORIZATION_HEADER_VALUE))
                .andExpect(jsonPath("$.authenticated", is(true)))
                .andExpect(jsonPath("$.principal.username", is(equalTo(TEST_USERNAME))))
                .andExpect(jsonPath("$.principal.password", bcrypt(TEST_PASSWORD + "1", passwordEncoder)))
                .andExpect(jsonPath("$.authorities.[0].authority", is(equalTo("admin"))));
    }

    @Autowired
    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Test
    public void test() {
        String encode = passwordEncoder.encode(TEST_PASSWORD);
        System.out.println(encode);
        boolean matches = passwordEncoder.matches(TEST_PASSWORD, encode);
        Assertions.assertTrue(matches);

        MatcherAssert.assertThat(BigDecimal.TEN, is(closeTo(BigDecimal.ZERO, BigDecimal.ONE)));
    }

     static final class BCryptMatcher extends TypeSafeMatcher<String> {
        private final String rawValue;
        private final PasswordEncoder passwordEncoder;

        public BCryptMatcher(String rawValue, PasswordEncoder passwordEncoder) {
            this.rawValue = rawValue;
            this.passwordEncoder = passwordEncoder;
        }

        public static Matcher<String> bcrypt(String rawValue, PasswordEncoder passwordEncoder) {
            return new BCryptMatcher(rawValue, passwordEncoder);
        }

         @Override
         protected boolean matchesSafely(String item) {
             return passwordEncoder.matches(rawValue, item);
         }

        @Override
        public void describeTo(Description description) {
            description.appendText("BCrypt hash does not match for raw value ")
                    .appendValue(rawValue);
        }

         @Override
         protected void describeMismatchSafely(String item, Description mismatchDescription) {
             super.describeMismatchSafely(item, mismatchDescription);
         }
     }
}
