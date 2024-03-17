package com.society.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ownervo")
public class OwnerVo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ownerId")
	private int id;

	@Column(name = "ownerName")
	private String ownerName;

	@Column(name = "houseNo")
	private String houseNo;

	@Column(name = "floorNo")
	private int floorNo;

	@ManyToOne
	@JoinColumn(name="blockId")
	private BlockVo blockVo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getHouseNo() {
		return houseNo;
	}

	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	public int getFloorNo() {
		return floorNo;
	}

	public void setFloorNo(int floorNo) {
		this.floorNo = floorNo;
	}

	public BlockVo getBlockVo() {
		return blockVo;
	}

	public void setBlockVo(BlockVo blockVo) {
		this.blockVo = blockVo;
	}	
	
}
