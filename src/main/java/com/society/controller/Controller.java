package com.society.controller;

import com.society.models.SocietyVo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping(value = "/")
    public ModelAndView index() {
        return new ModelAndView("redirect:/index");
    }
    
    @GetMapping(value = "/index")
    public ModelAndView dashBoard() {
        return new ModelAndView("admin/index");
    }

    @GetMapping(value = "/validation")
    public ModelAndView validation() {

        return new ModelAndView("admin/dummy", "societyVo", new SocietyVo());

    }
}
