package com.example.camera.models.converters;

import java.util.List;

public interface Converter<M, D> {
    M toModel(D dto);
    D toDTO(M model);
    List<D> toDTOList(List<M> modelList);
}
