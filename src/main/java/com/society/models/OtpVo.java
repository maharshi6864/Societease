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
@Table(name = "otpvo")
public class OtpVo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "otpId")
	private int id;

	private int otp;

	private long genratedTimestamp;

	@ManyToOne
	@JoinColumn(name = "loginId")
	private LoginVo loginVo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}

	public long getGenratedTimestamp() {
		return genratedTimestamp;
	}

	public void setGenratedTimestamp(long genratedTimestamp) {
		this.genratedTimestamp = genratedTimestamp;
	}

	public LoginVo getLoginVo() {
		return loginVo;
	}

	public void setLoginVo(LoginVo loginVo) {
		this.loginVo = loginVo;
	}

	public OtpVo(int id, int otp, long genratedTimestamp, LoginVo loginVo) {
		super();
		this.id = id;
		this.otp = otp;
		this.genratedTimestamp = genratedTimestamp;
		this.loginVo = loginVo;
	}
	
	
}
