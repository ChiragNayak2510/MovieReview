package com.example.movies.controllers;

import com.example.movies.services.UserService;
import com.example.movies.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> insertUser(@RequestBody Map<String,String> payload){
        Optional<User> newUserOptional = userService.createUser(payload);

        if (newUserOptional.isPresent()) {
            return new ResponseEntity<>(
                    newUserOptional.get(),
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(
                    "User already exists",
                    HttpStatus.GATEWAY_TIMEOUT
            );
        }
    }
}
