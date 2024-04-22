package kr.co.rland.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

@Mapper
public interface MenuRepository {
    // @Select("select * from menu")
    // List<MenuView> findAll();
    // 꼭 넣어야 하는 값은 앞에, 넣지 않아도 되는 값은 뒤에!
    List<MenuView> findAll(Long memberId, Long categoryId, String query, int offset, int size);

    Menu findById(Long id);
    // List<MenuView> findAllByName(String name);

    // Mybatis의 resultType은 정수가 기본!
    int save(Menu menu);
    int update(Menu menu);
    int delete(long id);

    int count(Long categoryId, String query);
    
}
