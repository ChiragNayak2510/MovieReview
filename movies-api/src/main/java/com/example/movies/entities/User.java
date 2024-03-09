package com.example.movies.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Field("_id")
    private ObjectId userId; // Make userId an ObjectId type

    private String name;
    private String username;
    private String email;

    private String password;

    @DocumentReference
    private List<Movie> watchList;

    private String profileImage;

    public User(String name, String username, String email, String password, String profileImage) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
    }
}
