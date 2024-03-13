package com.example.movies.controllers;

import com.example.movies.auth.AuthenticationRequest;
import com.example.movies.auth.AuthenticationResponse;
import com.example.movies.auth.RegisterRequest;
import com.example.movies.repositories.UserRepository;
import com.example.movies.services.UserService;
import com.example.movies.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})

public class AuthenticationController {
    @Autowired
    private UserService userService;
    private AuthenticationManager authenticationManager;

    @PostMapping
    public ResponseEntity<AuthenticationResponse> insertUser(@RequestBody RegisterRequest request){
        System.out.println(request.username);
        AuthenticationResponse jwtToken = userService.createUser(request);

        if (jwtToken != null && jwtToken.getToken() != null && !jwtToken.getToken().isEmpty()) {
            return ResponseEntity.ok(jwtToken);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Or any other appropriate response
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> auth(@RequestBody AuthenticationRequest request){
        AuthenticationResponse jwtToken = userService.authenticateUser(request);
        if (jwtToken != null && jwtToken.getToken() != null && !jwtToken.getToken().isEmpty()) {
            return ResponseEntity.ok(jwtToken);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Or any other appropriate response
        }
    }
}
