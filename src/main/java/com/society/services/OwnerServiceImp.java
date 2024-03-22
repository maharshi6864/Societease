package com.society.services;

import java.util.ArrayList;
import java.util.List;

import com.society.models.BlockVo;
import com.society.models.LoginVo;
import com.society.repository.LoginDAO;
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

    @Autowired
    private LoginService loginService;


    @Override
    public void insertOwners(String[] houseNumbers, String[] ownerName, String[] ownerId, String[] ownerEmail, int blockId, int floorNumber) {
        for (int index = 0; index < houseNumbers.length; index++) {

            OwnerVo ownerVo = new OwnerVo();
            BlockVo blockVo = new BlockVo();


            blockVo.setId(blockId);
            if (!ownerId[index].equals("0")) {
                ownerVo.setId(Integer.parseInt(ownerId[index]));
                LoginVo loginVo = this.findOwneById(ownerVo.getId()).getLoginVo();
                loginVo.setUsername(ownerEmail[index]);
                this.loginService.insertLogin(loginVo);
                ownerVo.setLoginVo(loginVo);
            } else {
                LoginVo loginVo = new LoginVo();
                loginVo.setEnabled("1");
                loginVo.setPassword("12345");
                loginVo.setUsername(ownerEmail[index]);
                loginVo.setRole("ROLE_USER");
                loginVo.setStatus(true);
                this.loginService.insertLogin(loginVo);
                ownerVo.setLoginVo(loginVo);
            }
            ownerVo.setBlockVo(blockVo);
            ownerVo.setFloorNo(floorNumber);
            ownerVo.setHouseNo(houseNumbers[index]);
            ownerVo.setOwnerName(ownerName[index]);
            ownerVo.setOwnerEmail(ownerEmail[index]);


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

    @Override
    public OwnerVo findOwneById(int ownerId) {
        return this.ownerDao.findOwneById(ownerId).get(0);
    }

    @Override
    public void insertOwner(OwnerVo ownerVo) {
        this.ownerDao.insertOwner(ownerVo);
    }
}
