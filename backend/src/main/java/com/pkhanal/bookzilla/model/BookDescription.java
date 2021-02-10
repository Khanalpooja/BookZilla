package com.pkhanal.bookzilla.model;

import lombok.Data;

@Data
public class BookDescription {
    private int year;
    private String edition;
    private String isbn;
    private int fileSize;
    private int pages;
    private String publisher;
    private String description;
    
}
