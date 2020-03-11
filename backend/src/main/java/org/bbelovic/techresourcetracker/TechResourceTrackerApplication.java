package org.bbelovic.techresourcetracker;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.apache.catalina.webresources.StandardRoot;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

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
    public SimpleModule iso8601Serializers() {
        SimpleModule module = new SimpleModule();
        module.addSerializer(LocalDateTime.class, new ISO8601LocalDateTimeSerializer());
        module.addDeserializer(LocalDateTime.class, new ISO8601LocalDateTimeDeserializer());
        return module;
    }

    @Bean
    public ConfigurableServletWebServerFactory webServerFactory() {
//        RewriteCond %{REQUEST_URI} -f
//        RewriteRule ^ - [L]
//        RewriteCond %{REQUEST_URI} -f
//        RewriteRule ^(.*)$ - [T=application/javascript]
//
//        RewriteCond %{REQUEST_URI} !-f
//        RewriteRule ^(.*)$ /index.html [L]

        var rule = """
                RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
                RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
                RewriteRule ^(.*)$ - [L,T=application/javascript]

                RewriteRule ^(.*)$ /index.html
                """;
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addContextValves(new LazyRewriteValve(rule));
        factory.addContextCustomizers(context -> {
            StandardRoot standardRoot = new StandardRoot(context);
            standardRoot.setCacheMaxSize(256 * 1024);
            standardRoot.setCachingAllowed(false);
            context.setResources(standardRoot);
        });
        return factory;
    }


    @Configuration
    public static class SecurityAdapter extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.inMemoryAuthentication().passwordEncoder(NoOpPasswordEncoder.getInstance())
                    .withUser("user").password("passwd").roles("admin");
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.httpBasic().and()
                    .authorizeRequests()
                    .antMatchers("/", "/inline.bundle.js", "/styles.bundle.js", "/scripts.bundle.js",
                            "/main.bundle.js", "/vendor.bundle.js", "/polyfills.bundle.js", "/login2")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
                    .and()
                    .logout().logoutSuccessUrl("/")
                    .and()
                    .csrf()
                    .csrfTokenRepository(withHttpOnlyFalse());
        }
    }
}
