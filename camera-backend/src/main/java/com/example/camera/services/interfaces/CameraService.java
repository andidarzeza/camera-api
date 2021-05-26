package com.example.camera.services.interfaces;

import com.example.camera.models.dtos.CameraDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface CameraService {
    ResponseEntity findAll(Pageable pageable);

    ResponseEntity delete(String id);

    ResponseEntity update(String id, CameraDTO cameraDTO);

    ResponseEntity find(String id);

    ResponseEntity add(CameraDTO cameraDTO);
}
