package kr.co.rland.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

@Mapper
public interface MenuRepository {
    //@Select("select * from menu")
    //List<MenuView> findAll();
    List<MenuView> findAll(Long categoryId, String query, int offset, int size);

    Menu findById(Long id);
    // List<MenuView> findAllByName(String name);

    void save(Menu menu);
    void update(Menu menu);
    void delete(long id);

    int count(Long categoryId, String query);
    
}
