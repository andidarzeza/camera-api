package com.example.camera.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.camera.models.Camera;

public interface CameraRepository extends MongoRepository<Camera, String>{

}
