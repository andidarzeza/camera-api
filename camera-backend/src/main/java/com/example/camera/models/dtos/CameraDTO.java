package com.example.camera.models.dtos;

import javax.persistence.Id;

public class CameraDTO {
    @Id
    private String id;
    private String name;
    private String model;
    private int resolution;
    private String ip;

    public CameraDTO(){

    }

    public CameraDTO(String id, String name, String model, int resolution, String ip) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.resolution = resolution;
        this.ip = ip;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    public int getResolution() {
        return resolution;
    }
    public void setResolution(int resolution) {
        this.resolution = resolution;
    }

}
