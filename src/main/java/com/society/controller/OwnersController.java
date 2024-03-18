package com.society.controller;

import com.society.models.BlockVo;
import com.society.models.OwnerVo;
import com.society.services.BlockService;
import com.society.services.OwnerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(value = "*")
@Controller
@RestController
public class OwnersController {

    @Autowired
    private BlockService blockService;

    @Autowired
    private OwnerService ownerService;

    @GetMapping(value = "/owners")
    public ModelAndView manageOwners() {
        List<BlockVo> blockList = this.blockService.searchBlock();
        return new ModelAndView("admin/manageOwners").addObject("blockList", blockList);
    }

    @RequestMapping(value = "/searchForFloor/{id}", method = RequestMethod.GET)
    public BlockVo searchForFloor(@PathVariable("id") int id) {
        List<BlockVo> blockList = this.blockService.searchBlock();
        BlockVo blockVo = this.blockService.findById(id);
        return blockVo;
    }

    @PostMapping(value = "/ownerName")
    public ModelAndView addOwner(@RequestParam int blockId, @RequestParam int floorNumber, HttpServletRequest request) {

        String[] houseNumbers = request.getParameterValues("houseNo");
        String[] ownerName = request.getParameterValues("ownerName");
        String[] ownerId = request.getParameterValues("ownerId");

       this.ownerService.insertOwner(houseNumbers,ownerName,ownerId,blockId,floorNumber);

        return new ModelAndView("redirect:/owners");
    }

    @RequestMapping(value = "/searchOwners/{floorNumber}/{blockName}", method = RequestMethod.GET)
    public List<OwnerVo> searchOwner(@PathVariable("floorNumber") int floorNumber,
                                     @PathVariable("blockName") int blockName) {
        List<OwnerVo> list = this.ownerService.findOwner(blockName, floorNumber);
        return list;
    }
}
