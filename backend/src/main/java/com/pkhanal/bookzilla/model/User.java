package com.pkhanal.bookzilla.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.*;

@Data @AllArgsConstructor
public class User {
    @Id private String id;
    private String name;
    private String password;
}
