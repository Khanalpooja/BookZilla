package com.pkhanal.bookzilla.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class User {
    @Id private String id;
    private String firstName;
    private String lastName;
}
