package com.society.services;

import com.society.models.LoginVo;
import com.society.models.MemberVo;
import com.society.models.OwnerVo;
import com.society.repository.MemberDao;
import com.society.repository.MemberDaoImp;
import com.society.utils.BaseMethods;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.util.List;

@Service
@Transactional
public class MemberServiceImp implements MemberService {

    @Autowired
    private MemberDao memberDao;

    @Autowired
    private LoginService loginService;

    @Override
    public void addMembers(int ownerId, String[] memberName, String[] memberPhoneNo, String[] memberEmail, List<MultipartFile> files, HttpServletRequest request) {

        LoginVo loginVo = loginService.getCurrentUser();

        for (int index = 0; index < memberName.length; index++) {

            String fileName = files.get(0).getOriginalFilename() + "_" + ownerId + "_" + index;
            String filePath = request.getSession().getServletContext().getRealPath("/") + "//documents//memberPhotos//";

            try {

                byte barr[] = files.get(index).getBytes();
                BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(filePath + fileName));
                bufferedOutputStream.write(barr);
                bufferedOutputStream.flush();
                bufferedOutputStream.close();

            } catch (Exception e) {
                e.printStackTrace();
            }

            MemberVo memberVo = new MemberVo();
            memberVo.setMemberName(memberName[index]);
            memberVo.setMemberEmail(memberEmail[index]);
            memberVo.setMemberPhoneNo(memberPhoneNo[index]);
            memberVo.setFileName(fileName);
            memberVo.setLoginVo(loginVo);
            this.memberDao.insertMember(memberVo);
        }
    }

    @Override
    public List<MemberVo> findMembers(int ownerId) {
        List<MemberVo> list = this.memberDao.findMembers(ownerId);
        return list;
    }

    @Override
    public MemberVo findMemberById(int id) {
        MemberVo memberVo = this.memberDao.findMemberById(id).get(0);
        return memberVo;
    }

    @Override
    public void deleteMember(int id) {
        this.memberDao.deleteMember(id);
    }

    @Override
    public List<MemberVo> searchMembers() {
        int loginId = this.loginService.getCurrentUser().getId();
        List<MemberVo> memberList = this.memberDao.findMembers(loginId);
        return memberList;
    }

    @Override
    public void updateMember(int memberId, String memberName, String memberPhone, String memberEmail) {
        MemberVo memberVo = this.findMemberById(memberId);
        memberVo.setId(memberId);
        memberVo.setMemberName(memberName);
        memberVo.setMemberEmail(memberEmail);
        memberVo.setMemberPhoneNo(memberPhone);
        this.memberDao.insertMember(memberVo);
    }

}
