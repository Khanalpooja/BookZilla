package com.pkhanal.bookzilla.repository;

import com.pkhanal.bookzilla.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

  List<Book> findByName(@Param("name") String name);

}