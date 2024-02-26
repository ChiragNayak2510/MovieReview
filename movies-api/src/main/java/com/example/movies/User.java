package com.example.movies;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import java.util.List;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private ObjectId userId;
    private String name;

    private String username;
    private String email;
    private String password;
    @DocumentReference
    private List<Movie> watchList;
    private String profileImage;

    public User(String name,String username,String email,String password,String profileImage){
        this.name = name;
    }

}
