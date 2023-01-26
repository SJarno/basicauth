package com.example.demo.configuration;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

    String[] staticResources = {
        "/*.js", "/*.css", "/*.ico"
    };
    String[] clientSideResources = {
        "/", "/home", "/login"
    };
    
    /* TODO: check if best practice to handle resources here
     * Or in security config
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(staticResources);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .httpBasic().and()
            .authorizeRequests()
                //.antMatchers(staticResources).permitAll()//note resources can be handled here
                .antMatchers(clientSideResources).permitAll()
                .anyRequest().authenticated()
                .and()
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }
    
}
