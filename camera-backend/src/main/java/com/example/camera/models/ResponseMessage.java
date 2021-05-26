package com.example.camera.models;

import com.example.camera.models.enums.MessageType;

public class ResponseMessage {
    private MessageType type;
    private String message;

    public ResponseMessage() {
    }

    public ResponseMessage(MessageType type, String message) {
        this.type = type;
        this.message = message;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
