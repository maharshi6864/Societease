package com.society.services;

import com.society.models.LoginVo;


public interface LoginService {

	void insertLogin(LoginVo loginVO);

	LoginVo findById(int id);
	
	LoginVo findByUsername(String username);
	
	LoginVo getCurrentUser();

}
