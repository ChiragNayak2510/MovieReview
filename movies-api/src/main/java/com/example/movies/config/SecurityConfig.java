package com.example.movies.config;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    @Autowired
    AuthenticationProvider authenticationProvider;
    @Autowired
    JWTAuthenticationFilter jwtAuthenticationFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    // CSRF configuration
                    .csrf(csrf -> csrf
                            .ignoringRequestMatchers("/api/v1/*")) // Disable CSRF protection for /api/v1/users endpoint
                    // Authorization configuration
                    .authorizeRequests(requests -> requests
                            .requestMatchers("/api/v1/*").permitAll() // Permit access to specific URL patterns
                            .anyRequest().authenticated()) // Require authentication for any other request
                    // Session management configuration
                    .sessionManagement(sessionManagement -> sessionManagement
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Configure session creation policy
                    // Authentication provider configuration
                    .authenticationProvider(authenticationProvider) // Add custom authentication provider
                    // Add filters
                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add filter before others

        return http.build();
        }

    }
