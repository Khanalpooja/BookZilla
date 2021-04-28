package com.pkhanal.bookzilla.repository;

import com.pkhanal.bookzilla.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

  List<Book> findByNameContainingIgnoreCaseOrderByName(@Param("name") String name);

  List<Book> findByDescriptionContainingIgnoreCase(@Param("name") String description);

  List<Book> findByAuthorContainingIgnoreCase(@Param("name") String author);

}