package com.society.services;

import java.util.ArrayList;
import java.util.List;

import com.society.models.BlockVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.models.OwnerVo;
import com.society.repository.OwnerDao;

@Service
@Transactional
public class OwnerServiceImp implements OwnerService {

    @Autowired
    private OwnerDao ownerDao;

    @Override
    public void insertOwner(String[] houseNumbers, String[] ownerName, String[] ownerId,String[] ownerEmail, int blockId, int floorNumber) {
        for (int index = 0; index < houseNumbers.length; index++) {

            OwnerVo ownerVo = new OwnerVo();
            BlockVo blockVo = new BlockVo();

            blockVo.setId(blockId);
            if (ownerId[index] != "0") {
                ownerVo.setId(Integer.parseInt(ownerId[index]));
            }
            ownerVo.setBlockVo(blockVo);
            ownerVo.setFloorNo(floorNumber);
            ownerVo.setHouseNo(houseNumbers[index]);
            ownerVo.setOwnerName(ownerName[index]);
            ownerVo.setOwnerEmail(ownerEmail[index]);
            System.out.println(houseNumbers[index]);
            System.out.println(ownerName[index]);
            System.out.println(blockId);
            System.out.println(floorNumber);
            this.ownerDao.insertOwner(ownerVo);
        }
    }

    @Override
    public List<OwnerVo> findOwner(int blockId, int floorNo) {
        List<OwnerVo> list = new ArrayList<OwnerVo>();
        try {
            list = this.ownerDao.findOwner(blockId, floorNo);
        } catch (Exception e) {
            System.out.println("Owners Not found with Sepcific Block and Floor.");
        }
        return list;
    }
}
