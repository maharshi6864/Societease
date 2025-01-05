package com.society.services;

import java.util.Map;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.dto.ResponseDto;
import com.society.models.LoginVo;
import com.society.models.OtpVo;
import com.society.repository.OtpDao;

@Service
@Transactional
public class ForgetPasswordServiceImp implements ForgetPasswordService {

	@Autowired
	private OtpDao otpDao;

	@Autowired
	private LoginService loginService;

	@Autowired
	private MailService mailService;

	@Override
	public ResponseDto findUserAndGenerateUsername(String username) {
		LoginVo loginVo = this.loginService.findByUsername(username);
		if (loginVo == null) {
			return new ResponseDto("Username not found.", false, loginVo);
		}
		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		OtpVo otpVo = new OtpVo(0, otp, 0l, loginVo);

		return sendOtpForForgetPassword(otpVo);
	}

	public ResponseDto sendOtpForForgetPassword(OtpVo otpVo) {
		// Generate the email body with a purple theme to match the login box
		StringBuilder emailBody = new StringBuilder();
		emailBody.append("<html>").append("<head>").append("<style>").append(
				"body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0; }")
				.append(".email-container { background: white; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 20px auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 8px; }")
				.append(".header { background-color: #6C63FF; color: white; padding: 10px 20px; text-align: center; font-size: 20px; border-radius: 8px 8px 0 0; }")
				.append(".footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }")
				.append(".otp { font-size: 24px; font-weight: bold; color: #6C63FF; }").append("p { margin: 10px 0; }")
				.append("</style>").append("</head>").append("<body>").append("<div class=\"email-container\">")
				.append("<div class=\"header\">Password Reset Request</div>").append("<p>Dear <strong>")
				.append(otpVo.getLoginVo().getUsername()).append("</strong>,</p>")
				.append("<p>We received a request to reset your password for your <b>SocietEase</b> account.</p>")
				.append("<p>Your One-Time Password (OTP) for password reset is:</p>").append("<p class=\"otp\">")
				.append(otpVo.getOtp()).append("</p>")
				.append("<p><small>(This OTP will expire in 3 minutes.)</small></p>")
				.append("<p>If you did not request this, please ignore this email. Your account is safe.</p>")
				.append("<p>Thank you,<br>SocietEase Team</p>").append("<div class=\"footer\">")
				.append("<p>&copy; 2024 <b>SocietEase</b>. All rights reserved.</p>").append("</div>").append("</div>")
				.append("</body>").append("</html>");

		// Send the email
		mailService.sendMail(otpVo.getLoginVo().getUsername(), "Password Reset OTP", emailBody.toString());
		otpVo.setGenratedTimestamp(System.currentTimeMillis() + (5 * 60 * 1000));
		otpDao.saveOtp(otpVo);
		ResponseDto responseDto = new ResponseDto("Otp generated to reset password.", true,
				otpVo.getGenratedTimestamp());
		return responseDto;
	}

}
