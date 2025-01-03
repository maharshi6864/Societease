package com.society.dto;

public class MaintenancePaymentConfirmDto {
	
	private String payemntId;
	
	private String orderId;
	
	private String month;
	
	private String year;
	
	private int amount;

	public String getPayemntId() {
		return payemntId;
	}

	public void setPayemntId(String payemntId) {
		this.payemntId = payemntId;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
}
