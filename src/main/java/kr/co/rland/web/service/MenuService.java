package kr.co.rland.web.service;

import java.util.List;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

public interface MenuService {
    List<MenuView> getList(Integer page);
    List<MenuView> getList(Integer page, Long categoryId);
    List<MenuView> getList(Integer page, String query);

    int getCount(Long categoryId);
    int getCount(String query);
    int getCount();

    Menu getById(Long id);
    
}
