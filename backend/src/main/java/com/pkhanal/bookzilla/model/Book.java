package com.pkhanal.bookzilla.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;


@Data @AllArgsConstructor
public class Book {
    @Id private String id;
    private String name;
    private String description;
    private String cover;
    private String url;
    private String category;
    private String author;
}
