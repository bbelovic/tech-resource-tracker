package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import static org.springframework.security.web.csrf.CookieCsrfTokenRepository.withHttpOnlyFalse;

@SpringBootApplication
public class TechResourceTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechResourceTrackerApplication.class, args);
    }

    @Bean
    public HttpTraceRepository httpTraceRepository() {
        return new InMemoryHttpTraceRepository();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
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
        private UserDetailsService defaultUserDetailsService;
        private PasswordEncoder passwordEncoder;
        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(defaultUserDetailsService)
                    .passwordEncoder(passwordEncoder);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.httpBasic().and()
                    .authorizeRequests()
                    .antMatchers("/", "/runtime-es2015.js", "/polyfills-es2015.js", "/styles-es2015.js",
                            "/vendor-es2015.js", "/main-es2015.js", "/scripts.js", "/favicon.ico", "/runtime")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
                    .and()
                    .logout().logoutSuccessUrl("/")
                    .and()
                    .csrf()
                    .csrfTokenRepository(withHttpOnlyFalse());
        }

        @Autowired
        public void setDefaultUserDetailsService(UserDetailsService defaultUserDetailsService) {
            this.defaultUserDetailsService = defaultUserDetailsService;
        }

        @Autowired
        public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
            this.passwordEncoder = passwordEncoder;
        }
    }
}
