package com.society.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.society.models.BlockVo;

@Controller
@RestController
public class MembersController {

	@GetMapping(value = "/members")
    public ModelAndView manageOwners() {
        return new ModelAndView("admin/manageMembers");
    }

}
