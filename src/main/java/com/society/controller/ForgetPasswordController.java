package com.society.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import com.society.dto.ResponseDto;
import com.society.services.ForgetPasswordService;

@RestController
public class ForgetPasswordController {
	
	@Autowired
	private ForgetPasswordService forgetPasswordService;
	
	@RequestMapping(value = "/forgetPassword", method = RequestMethod.GET)
	public ModelAndView loadLogin() {
		return new ModelAndView("forgetPassword");
	}
	
	@GetMapping(value = "/forgetPassword/findUsernameAndGenerateOtp")
	public ResponseEntity<ResponseDto> findUsernameAndGenerateOtp(@RequestParam(name="username")String username) {
		return new ResponseEntity<ResponseDto>(this.forgetPasswordService.findUserAndGenerateUsername(username),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/forgetPassword/changePassword", method = RequestMethod.GET)
	public ModelAndView confirmPassword() {
		return new ModelAndView("changePassword");
	}

}
