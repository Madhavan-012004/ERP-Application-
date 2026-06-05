package com.campusos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CampusosApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusosApplication.class, args);
    }

}
