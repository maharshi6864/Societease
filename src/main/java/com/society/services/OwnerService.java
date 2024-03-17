package com.society.services;

import java.util.List;

import com.society.models.OwnerVo;

public interface OwnerService {

	void insertOwner(OwnerVo ownerVo);
	
	List<OwnerVo> findOwner(int blockId,int floorNo);
}
