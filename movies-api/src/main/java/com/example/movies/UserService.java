package com.example.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    public User createUser(Map<String,String> payload){
        String name = payload.get("name");
        String username = payload.get("username");
        String email = payload.get("email");
        String password = payload.get("password");
        String hashedPassword = hash(password);
        String profileImage = payload.get("profileImage");

        User user = userRepository.insert(new User(name,username,email,hashedPassword,profileImage));
        return user;
    }
//

    public String hash(String password) {
        return passwordEncoder.encode(password);
    }

}
