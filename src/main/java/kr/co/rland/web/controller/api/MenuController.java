package kr.co.rland.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.rland.web.config.security.WebUserDetails;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.MenuService;

@RestController("apiMenuController")
@RequestMapping("api/menus")
public class MenuController {

    @Autowired
    private MenuService service;
    
    //@ResponseBody
    @GetMapping
    public List<MenuView> list(
        @RequestParam(name="c", required = false) Long categoryId
        , @RequestParam(name="q", required = false) String query 
        , @RequestParam(name="p", required = false, defaultValue = "1") Integer page
        , @AuthenticationPrincipal WebUserDetails userDetails) {

        Long memberId = null;
        // param으로 받아온 사용자 정보가 null이 아니라면 memberId에 사용자 정보를 get해서 넣음
        if (userDetails != null)
            memberId = userDetails.getId();

        List<MenuView> menus = new ArrayList<>();
        
        if (categoryId != null)
            menus = service.getList(memberId, page, categoryId);
        
        else if (query != null)
            menus = service.getList(memberId, page, query);
        
        else
            menus = service.getList(memberId, page);
                 
        // try {
        //     Thread.sleep(5000);
        // } catch (InterruptedException e) {
        //     // TODO Auto-generated catch block
        //     e.printStackTrace();
        // }
        return menus;
    }

    @PostMapping("1")
    public Menu get(Long id) {
        Menu menu = new Menu();
        return menu;
    }

    @PutMapping
    public Menu edit(Menu menu) {
        return null;
    }

    @DeleteMapping
    public String delete(Long id) {
        return null;
    }
}
