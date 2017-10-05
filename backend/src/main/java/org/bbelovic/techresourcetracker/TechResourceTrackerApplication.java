package org.bbelovic.techresourcetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
public class TechResourceTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechResourceTrackerApplication.class, args);
	}


	@Bean
    public WebSecurityConfigurerAdapter securityAdapter() {
	    return new WebSecurityConfigurerAdapter() {
            @Override
            protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.inMemoryAuthentication()
                        .withUser("user").password("passwd").roles("admin");
            }
        };
    }
}
