package kr.co.rland.web.service;

import kr.co.rland.web.entity.MenuLike;

public interface MenuLikeService {
    MenuLike add(MenuLike menuLike);
    String cancel(MenuLike menuLike);
}
