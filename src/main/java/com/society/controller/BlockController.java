package com.society.controller;

import com.society.models.BlockVo;
import com.society.services.BlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class BlockController {

    @Autowired
    BlockService blockService;

    @GetMapping(value = "/blocks")
    public ModelAndView manageBlocks() {
        List<BlockVo> list = this.blockService.searchBlock();
        return new ModelAndView("admin/manageBlocks","blockVo", new BlockVo()).addObject("list",list);
    }

    @PostMapping(value = "/blocks")
    public ModelAndView insertBlocks(@ModelAttribute BlockVo blockVo) {
        this.blockService.insertBlock(blockVo);
        return new ModelAndView("redirect:/blocks");
    }

    @GetMapping(value = "/deleteBlocks/{id}")
    public ModelAndView deleteBlocks(@PathVariable("id") int id) {
       this.blockService.deleteBlock(id);
        return new ModelAndView("redirect:/blocks");
    }
}
