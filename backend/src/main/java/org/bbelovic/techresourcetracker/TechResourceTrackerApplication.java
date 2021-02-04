package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;

import java.time.LocalDateTime;

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
    public static class SecurityAdapter extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
                    .antMatchers("/**/*.{js,html,css}").permitAll()
                    .antMatchers("/", "/user","/runtime", "/register").permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .oauth2Login()
                    .and()
                    .oauth2ResourceServer().jwt();

            http.requiresChannel()
                    .requestMatchers(
                r -> r.getHeader("X-Forwarded-Proto") != null
            ).requiresSecure();

            http.csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

            http.headers()
                    .contentSecurityPolicy("script-src 'self'; report-to /csp-report-endpoint/")
                    .and()
                    .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.SAME_ORIGIN)
                    .and()
                    .featurePolicy("accelerometer 'none'; camera 'none'; microphone 'none'");
        }
    }
}
