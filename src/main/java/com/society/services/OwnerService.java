package com.society.services;

import java.util.List;

import com.society.models.OwnerVo;

public interface OwnerService {

    void insertOwner(String[] houseNumbers, String[] ownerName, String[] ownerId,int blockId,int floorNumber);

    List<OwnerVo> findOwner(int blockId, int floorNo);
}
