package com.example.camera.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.camera.repo.CameraRepository;

@EnableMongoRepositories(basePackageClasses= CameraRepository.class)
@Configuration
public class MongoConfiguration{
	
}

