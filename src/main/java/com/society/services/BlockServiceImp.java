package com.society.services;

import com.society.models.BlockVo;
import com.society.repository.BlockDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BlockServiceImp implements BlockService {

    @Autowired
    BlockDao blockDao;

    @Override
    public void insertBlock(BlockVo blockVo) {
        this.blockDao.insertBlock(blockVo);
    }

    @Override
    public List<BlockVo> searchBlock() {
        return this.blockDao.searchBlock();
    }

    @Override
    public void deleteBlock(int id) {
        List<BlockVo> list = this.blockDao.findById(id);
        BlockVo blockVo = list.get(0);
        blockVo.setStatus(false);
        this.insertBlock(blockVo);
    }

    @Override
    public BlockVo findById(int id) {
        List<BlockVo> list = this.blockDao.findById(id);
        System.out.println("Getting Block Details");
        return list.get(0);
    }
}
