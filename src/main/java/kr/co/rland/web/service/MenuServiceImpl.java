package kr.co.rland.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.repository.MenuRepository;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository repository;

    @Override
    public List<MenuView> getList(Integer page) {
        return getList(page, null, null);
    }

    @Override
    public List<MenuView> getList(Integer page, Long categoryId) {
        return getList(page, categoryId, null);
    }

    @Override
    public List<MenuView> getList(Integer page, String query) {
        return getList(page, null, query);
    }

    public List<MenuView> getList(Integer page, Long categoryId, String query) {
        //page -> offset, size
        int size = 6;
        int offset = (page-1)*size;

        List<MenuView> list = repository.findAll(categoryId, query, offset, size);
        return list;
    }

    @Override
    public int getCount() {
        return getCount(null, null);
    }

    @Override
    public int getCount(Long categoryId) {
        return getCount(categoryId, null);
    }

    @Override
    public int getCount(String query) {
        return getCount(null, query);
    }

    public int getCount(Long categoryId, String query) {
        int count = repository.count(categoryId, query);
        return count;
    }

    @Override
    public Menu getById(Long id) {
        Menu menu = repository.findById(id);
        return menu;
    }
    
}
