package com.example.movies;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import java.util.List;

public class User {
    private ObjectId userId;
    private String name;
    private String email;
    private String password;
    @DocumentReference
    private List<Movie> watchList;
    private String bitmap;
}
