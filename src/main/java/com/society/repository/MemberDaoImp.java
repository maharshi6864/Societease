package com.society.repository;

import com.society.models.MemberVo;
import com.society.models.OwnerVo;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class MemberDaoImp implements MemberDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void insertMember(MemberVo memberVo) {
		try {
			Session session = sessionFactory.getCurrentSession();
			session.saveOrUpdate(memberVo);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public List<MemberVo> findMembers(int loginId) {
		List<MemberVo> list = new ArrayList<MemberVo>();
		try {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("from MemberVo where loginId=" + loginId);
			list = (List<MemberVo>) query.list();
		} catch (Exception e) {
			System.out.println(e);
		}
		return list;
	}

	public void deleteMember(int id) {
		try {
			Session session = sessionFactory.getCurrentSession();
			MemberVo memberVo = new MemberVo();
			memberVo.setId(id);
			session.delete(memberVo);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public List<MemberVo> findMemberById(int id) {
		List<MemberVo> list =new ArrayList<MemberVo>();
		try {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("from MemberVo where id=" + id);
			list = (List<MemberVo>) query.list();
		} catch (Exception e) {
			System.out.println(e);
		}
		return list;
	}
}
