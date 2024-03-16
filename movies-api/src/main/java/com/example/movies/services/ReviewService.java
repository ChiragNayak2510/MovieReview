package com.example.movies.services;

import com.example.movies.entities.Movie;
import com.example.movies.entities.Review;
import com.example.movies.entities.User;
import com.example.movies.repositories.ReviewRepository;
import com.example.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    public Review createReview(String reviewBody, String imdbId, String username){
        Optional<User> user = userRepository.findByUsernameOrEmail(username,"");
        if(user.isPresent()) {
            Review review = reviewRepository.insert(new Review(reviewBody, user.get()));
            mongoTemplate.update(Movie.class).
                    matching(Criteria.where("imdbId").
                            is(imdbId)).apply(new Update().push("reviewIds").value(review)).first();
            return review;
        }
        return null;
    }

}
