package com.example.camera.services.implementations;

import com.example.camera.models.Camera;
import com.example.camera.models.CameraWrapper;
import com.example.camera.models.ResponseMessage;
import com.example.camera.models.converters.Converter;
import com.example.camera.models.dtos.CameraDTO;
import com.example.camera.models.enums.MessageType;
import com.example.camera.repo.CameraRepository;
import com.example.camera.services.interfaces.CameraService;
import org.aspectj.bridge.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CameraServiceImpl implements CameraService {
    private final CameraRepository cameraRepository;
    private final Converter<Camera, CameraDTO> converter;
    public CameraServiceImpl(CameraRepository cameraRepository, Converter<Camera, CameraDTO> converter) {
        this.cameraRepository = cameraRepository;
        this.converter = converter;
    }

    @Override
    public ResponseEntity findAll(Pageable pageable) {
        Page<Camera> page= cameraRepository.findAll(pageable);
        List<CameraDTO> cameras = converter.toDTOList(page.getContent());
        return ResponseEntity.ok().body(new CameraWrapper(page.getTotalElements(), cameras));
    }

    @Override
    public ResponseEntity delete(String id) {
        Optional<Camera> camera = cameraRepository.findById(id);
        if(camera.isPresent()) {
            cameraRepository.delete(camera.get());
            return ResponseEntity.ok(new ResponseMessage(MessageType.SUCCESS, "Camera Deleted With Success."));
        }
        return ResponseEntity.ok(new ResponseMessage(MessageType.NOTFOUND, "Camera Not Found."));
    }

    @Override
    public ResponseEntity update(String id, CameraDTO cameraDTO) {
        Optional<Camera> camera = cameraRepository.findById(id);
        if(camera.isPresent()) {
            cameraDTO.setId(camera.get().getId());
            cameraRepository.save(converter.toModel(cameraDTO));
            return ResponseEntity.ok(new ResponseMessage(MessageType.SUCCESS, "Camera Updated With Success."));
        }
        return ResponseEntity.ok(new ResponseMessage(MessageType.NOTFOUND, "Camera Not Found."));
    }

    @Override
    public ResponseEntity find(String id) {
        Optional<Camera> camera = cameraRepository.findById(id);
        if(camera.isPresent()) {
            return ResponseEntity.ok(converter.toDTO(camera.get()));
        }
        return ResponseEntity.ok(new ResponseMessage(MessageType.NOTFOUND, "Camera Not Found."));
    }

    @Override
    public ResponseEntity add(CameraDTO cameraDTO) {
        cameraRepository.save(converter.toModel(cameraDTO));
        return ResponseEntity.ok(new ResponseMessage(MessageType.SUCCESS, "Camera Added."));
    }
}
