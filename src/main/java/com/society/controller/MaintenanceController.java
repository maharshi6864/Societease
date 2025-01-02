package com.society.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.society.models.MaintenanceChargesVo;
import com.society.models.MaintenancePaidVo;
import com.society.models.MaintenanceVo;
import com.society.models.OwnerVo;
import com.society.services.*;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Controller
@RestController
public class MaintenanceController {

	@Autowired
	private MaintenanceService maintenanceService;

	@Autowired
	private MaintenanceChargesService maintenanceChargesService;

	@Autowired
	private OwnerService ownerService;

	@Autowired
	private SocietyService societyService;

	@Autowired
	private MaintenancePaidService maintenancePaidService;

	@GetMapping(value = "admin/maintenance")
	public ModelAndView adminMaintenance() {
		return new ModelAndView("admin/manageMaintenance");
	}

	@GetMapping(value = "user/maintenance")
	public ModelAndView userMaintenance() {
		return new ModelAndView("user/maintenance");
	}

	@PostMapping(value = "admin/saveMaintenance")
	public ModelAndView saveMaintenance(HttpServletRequest request) {
		this.maintenanceService.saveMaintenance(request);
		return new ModelAndView("redirect:/admin/maintenance");
	}

	@GetMapping(value = "getMaintenanceDetails/{year}/{houseType}")
	public List<MaintenanceVo> getMaintenanceDetails(@PathVariable("year") String year,
			@PathVariable("houseType") String houseType) {
		return this.maintenanceService.getMaintenenaceDetails(year, houseType);

	}

	@GetMapping(value = "getMaintenanceDetailsForMonth/{maintenanceId}")
	public List<MaintenanceChargesVo> getMaintenanceDetailsForMonth(@PathVariable("maintenanceId") int maintenanceId) {
		return this.maintenanceChargesService.getMaintenenaceDetailsForMonth(maintenanceId);

	}

	@GetMapping(value = "user/getCurrentOwner")
	public List getCurrentOwner() {
		List ownerDetails = new ArrayList<Objects>();
		ownerDetails.add(this.ownerService.getCurrentOwner());
		ownerDetails.add(this.societyService.search());
		return ownerDetails;
	}

	@GetMapping(value = "user/getMaintenance/{month}")
	public List getMaintenance(@PathVariable String month) {
		List maintenanceLists = new ArrayList();
		MaintenanceVo maintenanceVo = this.maintenanceService.getMaintenanceOfYearAndMonth(month);
		List<MaintenanceChargesVo> maintenanceChargesVoList = this.maintenanceChargesService
				.getMaintenenaceDetailsForMonth(maintenanceVo.getId());
		OwnerVo ownerVo = this.ownerService.getCurrentOwner();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy");
		LocalDateTime now = LocalDateTime.now();
		MaintenancePaidVo maintenancePaidVo = this.maintenancePaidService
				.getMaintenancePaidDetailsForOwner(this.ownerService.getCurrentOwner().getId(), dtf.format(now), month);
		maintenanceLists.add(maintenanceVo);
		maintenanceLists.add(maintenanceChargesVoList);
		maintenanceLists.add(maintenancePaidVo);
		System.out.println(maintenanceLists.get(0));
		return maintenanceLists;
	}

	@GetMapping(value = "getMaintenanceDetailsForYear/{modelYearSelect}")
	public List getMaintenanceDetailsForYear(@PathVariable("modelYearSelect") String modelYearSelect) {
		List listOFAvailableHouseTypeForYear = this.maintenanceService.getAvailableHouseTypeForYear(modelYearSelect);
		return listOFAvailableHouseTypeForYear;
	}

	@GetMapping(value = "user/payMaintenance/{year}/{month}/{paymentAmount}")
//	Remember to change the url on front side and also get the year and month 
	public HashMap<?, ?> startPayment(@PathVariable("paymentAmount") String paymentAmount) throws RazorpayException {
		int amount = Integer.parseInt(paymentAmount);
		// Firstly we have created an object of razorpay client to build a
		// connection to transfer data between our
		// Spring Server to the Razorpay server and then an order is created.
		RazorpayClient client = new RazorpayClient("rzp_test_izXIdrWl0ey5MJ", "SHGwGUA7ls5qKkH1kn6yObkz");

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount * 100);
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "firstReciept");

		Order createdOrder = client.Orders.create(orderRequest);
		// Extracting the ID from the created order
		String orderId = createdOrder.get("id");
		HashMap<String, String> map = new HashMap<String, String>();
		System.out.println(orderId);
		map.put("razorPay", createdOrder.toString());
		return map;
	}

}
