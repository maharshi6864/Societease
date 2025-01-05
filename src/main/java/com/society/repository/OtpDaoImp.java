package com.society.repository;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.society.models.OtpVo;

@Repository
public class OtpDaoImp implements OtpDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void saveOtp(OtpVo otpVo) {
		try {
			Session session = sessionFactory.getCurrentSession();
			session.saveOrUpdate(otpVo);
		} catch (Exception e) {
			System.out.println(e+"This is from otp dao");
		}
	}

//	    @Override
//	    public ArrayList<NotificationVo> getCurrentUserNotifications(int ownerId) {
//	        List<NotificationVo> list = new ArrayList<NotificationVo>();
//	        try {
//	            Session session = sessionFactory.getCurrentSession();
//	            Query query = session.createQuery("from NotificationVo where ownerId=" + ownerId + "and status =true");
//	            list = (List<NotificationVo>) query.list();
//	            session.clear();
//	            session.flush();
//	        } catch (Exception e) {
//	            System.out.println(e);
//	        }
//	        return (ArrayList<NotificationVo>) list;
//	    }

}
