package com.pkhanal.bookzilla;

import com.pkhanal.bookzilla.model.Book;
import com.pkhanal.bookzilla.repository.BookRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
public class BookZillaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookZillaApplication.class, args);
	}

}
