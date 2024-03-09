package com.example.movies.services;

import com.example.movies.entities.User;
import com.example.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Optional<User> createUser(Map<String, String> payload) {
        String name = payload.get("name");
        String username = payload.get("username");
        String email = payload.get("email");
        String password = payload.get("password");
        String profileImage = payload.get("profileImage");

        // Check if user with given username or email already exists
        if (userRepository.existsByUsernameOrEmail(username, email)) {
            return Optional.empty();
        }

        String hashedPassword = hash(password);
        User newUser = new User(name, username, email, hashedPassword, profileImage);
        return Optional.of(userRepository.save(newUser));
    }

    public String hash(String password) {
        return passwordEncoder.encode(password);
    }
}
