package com.example.camera.api;

import com.example.camera.models.dtos.CameraDTO;
import com.example.camera.services.interfaces.CameraService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cameras")
public class CameraController {

	private final CameraService cameraService;

	public CameraController(CameraService cameraService) {
		this.cameraService = cameraService;
	}

	@GetMapping("/all")
	public ResponseEntity findAll(Pageable pageable){
		return cameraService.findAll(pageable);
	}
	
	@PostMapping("/add")
	public ResponseEntity add(@RequestBody CameraDTO cameraDTO) {
		return cameraService.add(cameraDTO);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity find(@PathVariable String id){
		return cameraService.find(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity delete(@PathVariable String id) {
		return cameraService.delete(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity delete(@PathVariable String id, @RequestBody CameraDTO cameraDTO) {
		return cameraService.update(id, cameraDTO);
	}
	
}
