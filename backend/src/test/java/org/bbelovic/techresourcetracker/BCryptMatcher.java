package org.bbelovic.techresourcetracker;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.springframework.security.crypto.password.PasswordEncoder;

import static java.util.Objects.requireNonNull;

final class BCryptMatcher extends TypeSafeMatcher<String> {
        private final String rawValue;
        private final PasswordEncoder passwordEncoder;

        private BCryptMatcher(String rawValue, PasswordEncoder passwordEncoder) {
            this.rawValue = requireNonNull(rawValue, "'rawValue' is required");
            this.passwordEncoder = requireNonNull(passwordEncoder, "'passwordEncoder is required'");
        }

        public static Matcher<String> bcryptHash(String rawValue, PasswordEncoder passwordEncoder) {
            return new BCryptMatcher(rawValue, passwordEncoder);
        }

         @Override
         protected boolean matchesSafely(String item) {
             return passwordEncoder.matches(rawValue, item);
         }

        @Override
        public void describeTo(Description description) {
            description.appendText("provided hash value matches raw value ")
                    .appendValue(rawValue)
                    .appendText(" after it too is encoded by bcrypt encoder");
        }

         @Override
         protected void describeMismatchSafely(String item, Description mismatchDescription) {
            mismatchDescription
                    .appendText("provided hash ")
                    .appendValue(item)
                    .appendText(" does not match bcrypt(")
                    .appendValue(rawValue)
                    .appendText(")")
                    .appendText("\n     ")
                    .appendText("(assuming both hash values were computed with same bcrypt encoder instance)");
         }
}