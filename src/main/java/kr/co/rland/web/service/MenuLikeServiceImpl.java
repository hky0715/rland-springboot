package kr.co.rland.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.MenuLike;
import kr.co.rland.web.repository.MenuLikeRepository;

@Service
public class MenuLikeServiceImpl implements MenuLikeService{

    @Autowired
    private MenuLikeRepository repository;

    @Override
    public MenuLike add(MenuLike menuLike) {
        int result = repository.save(menuLike);
        return menuLike;
    }

    @Override
    public String cancel(MenuLike menuLike) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'cancel'");
    }

}
