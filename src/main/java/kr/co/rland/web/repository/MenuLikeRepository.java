package kr.co.rland.web.repository;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.MenuLike;

@Mapper
public interface MenuLikeRepository {
    int save(MenuLike menuLike);
    int delete(MenuLike menuLike);
}
