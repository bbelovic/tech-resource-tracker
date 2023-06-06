package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

import java.time.LocalDateTime;

import static org.springframework.security.config.Customizer.withDefaults;

@SpringBootApplication
public class TechResourceTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechResourceTrackerApplication.class, args);
    }

    @Bean
    public SimpleModule iso8601Serializers() {
        SimpleModule module = new SimpleModule();
        module.addSerializer(LocalDateTime.class, new ISO8601LocalDateTimeSerializer());
        module.addDeserializer(LocalDateTime.class, new ISO8601LocalDateTimeDeserializer());
        return module;
    }

    @Configuration
    public static class SecurityConfiguration {
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests((authz) -> authz
                            .requestMatchers("/", "/user", "/index.html", "*.ico", "*.css", "*.js", "/runtime").permitAll()
                            .anyRequest().authenticated())
                    .oauth2Login(withDefaults())
                    .oauth2ResourceServer((oauth2) -> oauth2.jwt(withDefaults()))
                    .csrf((csrf) -> csrf
                            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                            .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))
                    .addFilterAfter(new CookieCsrfFilter(), BasicAuthenticationFilter.class);

            return http.build();
        }
    }
}
