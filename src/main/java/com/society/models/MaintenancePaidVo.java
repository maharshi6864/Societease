package com.society.models;

import javax.persistence.*;
import java.security.acl.Owner;

@Entity
@Table(name = "maintenancepaidvo")
public class MaintenancePaidVo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;

	private String year;

	private String month;

	private String paymentType;

	private boolean maintenanceStatus;
	
	private String paymentId;
	
	private String orderId;
	
	private long timestamp;

	@ManyToOne
	@JoinColumn(name = "ownerId")
	private OwnerVo ownerVo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public boolean isMaintenanceStatus() {
		return maintenanceStatus;
	}

	public void setMaintenanceStatus(boolean maintenanceStatus) {
		this.maintenanceStatus = maintenanceStatus;
	}
	
	public String getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	
	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public OwnerVo getOwnerVo() {
		return ownerVo;
	}

	public void setOwnerVo(OwnerVo ownerVo) {
		this.ownerVo = ownerVo;
	}

}
