package com.society.services;

import com.society.models.MemberVo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface MemberService {

    void addMembers(int ownerId, String []memberName, String []memberEmail, String []memberPhoneNo, List<MultipartFile> memberFile, HttpServletRequest request);

    List<MemberVo> findMembers(int ownerId);

    MemberVo findMemberById(int id);

    void deleteMember(int id);
    
    List<MemberVo> searchMembers();

    void updateMember(int memberId,String memberName,String memberPhone,String memberEmail);
}
