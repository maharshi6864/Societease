package com.society.repository;

import com.society.models.MemberVo;

import java.util.List;

public interface MemberDao {

    void insertMember(MemberVo memberVo);

    List<MemberVo> findMembers(int ownerId);

    void deleteMember(int id);

    List<MemberVo> findMemberById(int id);
}
