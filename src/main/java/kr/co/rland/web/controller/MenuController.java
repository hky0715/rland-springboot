package kr.co.rland.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.rland.web.entity.Category;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.CategoryService;
import kr.co.rland.web.service.MenuService;

@Controller
@RequestMapping("menu")
public class MenuController {

    @Autowired
    private MenuService service;

    @Autowired
    private CategoryService categoryService;

    Menu menu = Menu
                .builder()
                .id(1)
                .korName("아아메")
                .engName("iced americano")
                .build();

    
    @GetMapping("list")
    public String list(
        @RequestParam(name="c", required = false) Long categoryId,
        @RequestParam(name="q", required = false) String query, 
        @RequestParam(name="p", required = false, defaultValue = "1") Integer page, Model model) {

        System.out.println("category:"+categoryId);
        System.out.println("page:"+page);
        List<Category> categoryList = categoryService.getList();

        //List<MenuView> menuList = service.getListByCategoryId(categoryId);
        List<MenuView> menuList = new ArrayList<>();
        int count=0;

        if (categoryId != null) {
            menuList = service.getList(page, categoryId);
            count = service.getCount(categoryId);
        }

        else if (query != null) {
            menuList = service.getList(page, query);
            count = service.getCount(query);
        }

        else {
            menuList = service.getList(page);
            count = service.getCount();
        }     

        model.addAttribute("cList", categoryList);
        model.addAttribute("mList", menuList);
        model.addAttribute("count", count);
    
        System.out.println("count내놔 : " + count);

        // return하는 html 파일들이 저장된 경로의 "/"는 templates임. 여기를 기준으로 쓰자
        return "menu/list";
    }

    @GetMapping("detail")
    public String detail(@RequestParam Long id, Model model) {
        Menu menu = service.getById(id);
        
        model.addAttribute("menu", menu);
        return "menu/detail";
    }
}
