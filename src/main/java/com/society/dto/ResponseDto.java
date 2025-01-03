package com.society.dto;

public class ResponseDto {
	
	private String message;
	
	private boolean status;
	
	private Object body;

	public ResponseDto(String message, boolean status, Object body) {
		super();
		this.message = message;
		this.status = status;
		this.body = body;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Object getBody() {
		return body;
	}

	public void setBody(Object body) {
		this.body = body;
	}
	
	

}
