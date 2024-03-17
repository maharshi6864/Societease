package com.society.services;

import com.society.models.BlockVo;

import java.util.List;

public interface BlockService {

    void insertBlock(BlockVo blockVo);

    List<BlockVo> searchBlock();

    void deleteBlock(int id);

    BlockVo findById(int id);

}
