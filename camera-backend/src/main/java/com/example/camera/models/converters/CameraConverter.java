package com.example.camera.models.converters;

import com.example.camera.models.Camera;
import com.example.camera.models.dtos.CameraDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CameraConverter implements Converter<Camera, CameraDTO>{
    @Override
    public Camera toModel(CameraDTO dto) {
        return new Camera(dto.getId(), dto.getName(), dto.getModel(), dto.getResolution(), dto.getIp());
    }

    @Override
    public CameraDTO toDTO(Camera model) {
        return new CameraDTO(model.getId(), model.getName(), model.getModel(), model.getResolution(), model.getIp());
    }

    @Override
    public List<CameraDTO> toDTOList(List<Camera> modelList) {
        return modelList.stream().map(camera -> toDTO(camera)).collect(Collectors.toList());
    }
}
