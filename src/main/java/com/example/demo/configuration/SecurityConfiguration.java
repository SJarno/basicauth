package com.example.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.DelegatingSecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.savedrequest.NullRequestCache;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    String[] staticResources = {
            "/*.js", "/*.css", "/*.ico"
    };
    String[] clientSideResources = {
            "/", "/home", "/login"
    };

    /*
     * TODO: check if best practice to handle resources here
     * Or in security config
     */
    @Bean
    WebSecurityCustomizer webSecurity() throws Exception {
        return (web) -> web.ignoring().requestMatchers(staticResources);
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //https://angular.io/api/common/http/HttpClientXsrfModule
        //https://docs.spring.io/spring-security/reference/5.8/migration/servlet/exploits.html
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName(null);
        //requestHandler.setCsrfRequestAttributeName("_csrf");//possible break here
        http
                // cache
                .requestCache((cache) -> cache.requestCache(new NullRequestCache()))
                // Session management
                .sessionManagement((sessions) -> sessions
                        .requireExplicitAuthenticationStrategy(false)) // this is breaking the session
                //
                .securityContext((securityContext) -> securityContext
                        .requireExplicitSave(false)
                        // new defaults for creating own context
                        .securityContextRepository(new DelegatingSecurityContextRepository(
                                new RequestAttributeSecurityContextRepository(),
                                new HttpSessionSecurityContextRepository())))
                .securityMatcher("/**")//excplicit protection for path
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(clientSideResources).permitAll()
                        .anyRequest().authenticated())
                .httpBasic()
                .and()
                .csrf((csrf) -> csrf
                    .csrfTokenRequestHandler(requestHandler)
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                );
        return http.build();
    }

}
