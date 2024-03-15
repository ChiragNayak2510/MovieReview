package com.example.movies.services;

import com.example.movies.auth.AuthenticationRequest;
import com.example.movies.auth.AuthenticationResponse;
import com.example.movies.auth.RegisterRequest;
import com.example.movies.entities.User;
import com.example.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    private AuthenticationResponse authenticationResponse;

    public AuthenticationResponse createUser(RegisterRequest request) {
        String name = request.name;
        String username = request.username;
        String email = request.email;
        String password = passwordEncoder.encode(request.password);
        String profileImage = request.profileImage;

        // Check if user with given username or email already exists
        if (userRepository.existsByUsernameOrEmail(username, email)) {
            return new AuthenticationResponse();
        }

        User newUser = new User(name, username, email, password, profileImage);
        userRepository.save(newUser);
        String jwtToken = jwtService.generateToken(newUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateUser(AuthenticationRequest request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username,
                        request.password
                )
        );
        Optional<User> user = userRepository.findByUsernameOrEmail(request.username,"");
        if(user.isPresent()){
            String jwtToken = jwtService.generateToken(user.get());
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        return new AuthenticationResponse();
    }



    public String hash(String password) {
        return passwordEncoder.encode(password);
    }
}
