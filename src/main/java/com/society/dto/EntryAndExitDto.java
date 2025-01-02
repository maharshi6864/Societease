package com.society.dto;

public class EntryAndExitDto {

    private String time;

    private String data;

    private String vehicleNumber;

    private String knowUnknownStatus;

    private String ownerId;

    private String imageURL;

    public EntryAndExitDto(String time, String data, String vehicleNumber, String knowUnknownStatus, String ownerId, String imageURL) {
        this.time = time;
        this.data = data;
        this.vehicleNumber = vehicleNumber;
        this.knowUnknownStatus = knowUnknownStatus;
        this.ownerId = ownerId;
        this.imageURL = imageURL;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getKnowUnknownStatus() {
        return knowUnknownStatus;
    }

    public void setKnowUnknownStatus(String knowUnknownStatus) {
        this.knowUnknownStatus = knowUnknownStatus;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
