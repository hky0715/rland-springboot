package kr.co.rland.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.rland.web.entity.MenuLike;
import kr.co.rland.web.service.MenuLikeService;

@RestController
@RequestMapping("api/menu-likes")
public class MenuLikeController {

    @Autowired
    private MenuLikeService service;

    @PostMapping
    // api를 보내면 success가 뜨는데 MenuLike(memberId=null, menuId=null, regDate=null)... 터졌엉....
    // 키가 안왔어! raw data 통으로 줄테니까 key,value 분리해서 니가 알아서 쓰렴! 이라고 알려줘야 함
    public MenuLike add(@RequestBody MenuLike menuLike) {
        System.out.println(menuLike);
        MenuLike newOne = service.add(menuLike);

        return newOne;
    }

    @DeleteMapping
    public String delete(Long id) {
        return null;
    }

}
