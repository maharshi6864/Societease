package com.society.services;

import java.util.ArrayList;
import java.util.List;

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
	public void insertOwner(OwnerVo ownerVo) {
		this.ownerDao.insertOwner(ownerVo);
	}

	@Override
	public List<OwnerVo> findOwner(int blockId, int floorNo) {
		List<OwnerVo> list =new ArrayList<OwnerVo>();
		try {
			list=this.ownerDao.findOwner(blockId, floorNo);
		} catch (Exception e) {
			System.out.println("Owners Not found with Sepcific Block and Floor.");
		}
		return list;
	}
}
