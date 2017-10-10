package org.bbelovic.techresourcetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import static org.springframework.security.web.csrf.CookieCsrfTokenRepository.withHttpOnlyFalse;

@SpringBootApplication
public class TechResourceTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechResourceTrackerApplication.class, args);
	}


	@Configuration
    @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
    public static class SecurityAdapter extends WebSecurityConfigurerAdapter {
            @Override
            protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.inMemoryAuthentication()
                        .withUser("user").password("passwd").roles("admin");
            }

            @Override
            protected void configure(HttpSecurity http) throws Exception {
                http.authorizeRequests()
                        .anyRequest()
                        .authenticated()
                        .and()
                        .formLogin()
                        .and()
                        .csrf()
                    .csrfTokenRepository(withHttpOnlyFalse());
            }
        }
}
