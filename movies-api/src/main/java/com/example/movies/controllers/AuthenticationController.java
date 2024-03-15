package com.example.movies.controllers;

import com.example.movies.auth.AuthenticationRequest;
import com.example.movies.auth.AuthenticationResponse;
import com.example.movies.auth.RegisterRequest;
import com.example.movies.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})

public class AuthenticationController {
    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> insertUser(@RequestBody RegisterRequest request, HttpServletResponse response){
        AuthenticationResponse jwtToken = userService.createUser(request);

        if (jwtToken != null && jwtToken.getToken() != null && !jwtToken.getToken().isEmpty()) {
            Cookie cookie = new Cookie("jwtToken", jwtToken.getToken());
            cookie.setHttpOnly(true); // Prevent JavaScript access to the cookie for security
            cookie.setMaxAge(3600); // Set the cookie expiration time (in seconds), adjust as needed
            cookie.setPath("/");
            response.addCookie(cookie);
            return ResponseEntity.ok(jwtToken);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Or any other appropriate response
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> auth(@RequestBody AuthenticationRequest request,HttpServletResponse response){
        AuthenticationResponse jwtToken = userService.authenticateUser(request);
        if (jwtToken != null && jwtToken.getToken() != null && !jwtToken.getToken().isEmpty()) {
            Cookie cookie = new Cookie("jwtToken", jwtToken.getToken());
            cookie.setHttpOnly(true); // Prevent JavaScript access to the cookie for security
            cookie.setMaxAge(3600); // Set the cookie expiration time (in seconds), adjust as needed
            cookie.setPath("/");
            response.addCookie(cookie);
            return ResponseEntity.ok(jwtToken);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Or any other appropriate response
        }
    }
}
