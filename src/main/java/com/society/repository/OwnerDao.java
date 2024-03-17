package com.society.repository;

import java.util.List;

import com.society.models.OwnerVo;

public interface OwnerDao {
	
	void  insertOwner(OwnerVo ownerVo);
	
	List<OwnerVo> findOwner(int blockId,int floorNo);

}
