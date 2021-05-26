package com.example.camera.models;

import com.example.camera.models.dtos.CameraDTO;

import java.util.List;

public class CameraWrapper {
    private long count;
    private List<CameraDTO> list;

    public CameraWrapper(long count, List<CameraDTO> list) {
        this.count = count;
        this.list = list;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public List<CameraDTO> getList() {
        return list;
    }

    public void setList(List<CameraDTO> list) {
        this.list = list;
    }
}
