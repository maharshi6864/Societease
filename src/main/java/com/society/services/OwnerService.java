package com.society.services;

import java.util.List;

import com.society.models.OwnerVo;

public interface OwnerService {

    void insertOwners(String[] houseNumbers, String[] ownerName, String[] ownerId, String[] ownerEmail, int blockId, int floorNumber);

    List<OwnerVo> findOwner(int blockId, int floorNo);

    OwnerVo findOwneById(int ownerId);
    
    void insertOwner(OwnerVo ownerVo);
    
}
