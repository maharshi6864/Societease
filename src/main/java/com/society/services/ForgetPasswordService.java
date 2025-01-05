package com.society.services;

import com.society.dto.ResponseDto;

public interface ForgetPasswordService {
	
	public ResponseDto findUserAndGenerateUsername(String username);

}
