package com.society.repository;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.society.models.BlockVo;
import com.society.models.OwnerVo;

@Repository
public class ownerDaoImp implements OwnerDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void insertOwner(OwnerVo ownerVo) {
		try {
			Session session = sessionFactory.getCurrentSession();
			session.saveOrUpdate(ownerVo);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OwnerVo> findOwner(int blockId, int floorNo) {

		List<OwnerVo> list = new ArrayList<OwnerVo>();
		try {
			Session session = sessionFactory.getCurrentSession();
			Query query = session.createQuery("from OwnerVo where blockId=" + blockId + "and  floorNo=" + floorNo);
			list = (List<OwnerVo>) query.list();
		} catch (Exception e) {
			System.out.println(e);
		}
		return list;
	}
}
