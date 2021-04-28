package com.pkhanal.bookzilla.repository;

import com.pkhanal.bookzilla.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {

  List<User> findByNameIgnoreCase(@Param("name") String name);

}