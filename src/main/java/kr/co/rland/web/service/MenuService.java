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
   
    /* 데이터를 넣을 땐 없었던 데이터(ex. id)를 사용하기 위해서 메뉴를 다시 빼와야 함 
    해당 데이터를 쓰든 쓰지않든 일단 그냥 받아옴*/ 
    int add(Menu menu);
}
