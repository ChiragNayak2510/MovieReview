package com.example.movies;

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
        User newUser = userService.createUser(payload);
        if(newUser != null) {
            return new ResponseEntity<User>(
                    newUser,
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<String>(
                    "Something went wrong",
                    HttpStatus.BAD_REQUEST
            );
        }
    }
//    public ResponseEntity<Review> createReview(@RequestBody Map<String,String> payload){
//        return new ResponseEntity<>(
//                reviewService.createReview(payload.get("reviewBody"),payload.get("imdbId")),
//                HttpStatus.OK
//        );
//    }

}
