package kr.co.rland.web.controller;

import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.config.security.WebUserDetails;
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
        @RequestParam(name="c", required = false) Long categoryId
        , @RequestParam(name="q", required = false) String query
        , @RequestParam(name="p", required = false, defaultValue = "1") Integer page
        , @CookieValue(name="menus", required = false) String cookie
        , @AuthenticationPrincipal WebUserDetails userDetails
        , HttpServletResponse response
        , Model model) {

        Long memberId = null;
        // param으로 받아온 사용자 정보가 null이 아니라면 memberId에 사용자 정보를 get해서 넣음
        if (userDetails != null)
            memberId = userDetails.getId();

        System.out.println("category:"+categoryId);
        System.out.println("page:"+page);
        List<Category> categoryList = categoryService.getList();

        //List<MenuView> menuList = service.getListByCategoryId(categoryId);
        List<MenuView> menuList = new ArrayList<>();
        int count=0;

        if (categoryId != null) {
            menuList = service.getList(memberId, page, categoryId);
            count = service.getCount(categoryId);
        }

        else if (query != null) {
            menuList = service.getList(memberId, page, query);
            count = service.getCount(query);
        }

        else {
            menuList = service.getList(memberId, page);
            count = service.getCount();
        }     

        model.addAttribute("cList", categoryList);
        model.addAttribute("mList", menuList);
        model.addAttribute("count", count);

        int cartTotalPrice = 0;
        int cartCount = 0;

        System.out.println(menuList.get(0).isLike());
        
        /* List 객체로 다시 변환해야함!
        (X) List<MenuView> cookieList = new Gson().fromJson(cookie, List.class);
        (1) MenuView[] list = new Gson().fromJson(cookie, Menu[].class);
        (2) Gson이 제공하는 TypeToken으로.... type을 맞춰줘라....*/ 
        
        if (cookie != null) { 
            
            String decodedCookieList = URLDecoder.decode(cookie, Charset.forName("utf-8"));
            Type menuListType = new TypeToken<List<MenuView>>(){}.getType();
            List<MenuView> cookieList = new Gson().fromJson(decodedCookieList, menuListType);
            //cookieList = new Gson().fromJson(cookie, List.class);

            // for(int i=0; i<cookieList.size(); i++)    
            //     cartTotalPrice = cookieList.get(i).getPrice();

            for (MenuView coo : cookieList) 
                cartTotalPrice += coo.getPrice();
            
            cartCount = cookieList.size();
        }
       
        

        model.addAttribute("cartTotalPrice", cartTotalPrice);
        model.addAttribute("cartCount", cartCount);
    
        System.out.println("count내놔 : " + count);
        System.out.println("장바구니 품목 수 내뇨ㅏ : " + cartCount);
        System.out.println("장바구니 총 가격 내놔 : " + cartTotalPrice);

        // return하는 html 파일들이 저장된 경로의 "/"는 templates임. 여기를 기준으로 쓰자
        return "menu/list-dom";
    }

    @GetMapping("list-vue")
    public String listVue(
        @RequestParam(name="c", required = false) Long categoryId
        , @RequestParam(name="q", required = false) String query
        , @RequestParam(name="p", required = false, defaultValue = "1") Integer page
        , @CookieValue(name="menus", required = false) String cookie
        , @AuthenticationPrincipal WebUserDetails userDetails
        , HttpServletResponse response
        , Model model) {

        Long memberId = null;
        // param으로 받아온 사용자 정보가 null이 아니라면 memberId에 사용자 정보를 get해서 넣음
        if (userDetails != null)
            memberId = userDetails.getId();

        System.out.println("category:"+categoryId);
        System.out.println("page:"+page);
        List<Category> categoryList = categoryService.getList();

        //List<MenuView> menuList = service.getListByCategoryId(categoryId);
        List<MenuView> menuList = new ArrayList<>();
        int count=0;

        if (categoryId != null) {
            menuList = service.getList(memberId, page, categoryId);
            count = service.getCount(categoryId);
        }

        else if (query != null) {
            menuList = service.getList(memberId, page, query);
            count = service.getCount(query);
        }

        else {
            menuList = service.getList(memberId, page);
            count = service.getCount();
        }     

        model.addAttribute("cList", categoryList);
        model.addAttribute("mList", menuList);
        model.addAttribute("count", count);

        int cartTotalPrice = 0;
        int cartCount = 0;

        System.out.println(menuList.get(0).isLike());
        
        /* List 객체로 다시 변환해야함!
        (X) List<MenuView> cookieList = new Gson().fromJson(cookie, List.class);
        (1) MenuView[] list = new Gson().fromJson(cookie, Menu[].class);
        (2) Gson이 제공하는 TypeToken으로.... type을 맞춰줘라....*/ 
        
        if (cookie != null) { 
            
            String decodedCookieList = URLDecoder.decode(cookie, Charset.forName("utf-8"));
            Type menuListType = new TypeToken<List<MenuView>>(){}.getType();
            List<MenuView> cookieList = new Gson().fromJson(decodedCookieList, menuListType);
            //cookieList = new Gson().fromJson(cookie, List.class);

            // for(int i=0; i<cookieList.size(); i++)    
            //     cartTotalPrice = cookieList.get(i).getPrice();

            for (MenuView coo : cookieList) 
                cartTotalPrice += coo.getPrice();
            
            cartCount = cookieList.size();
        }
       
        

        model.addAttribute("cartTotalPrice", cartTotalPrice);
        model.addAttribute("cartCount", cartCount);
    
        System.out.println("count내놔 : " + count);
        System.out.println("장바구니 품목 수 내뇨ㅏ : " + cartCount);
        System.out.println("장바구니 총 가격 내놔 : " + cartTotalPrice);

        // return하는 html 파일들이 저장된 경로의 "/"는 templates임. 여기를 기준으로 쓰자
        return "menu/list-vue";
    }

    @GetMapping("list-react")
    public String listReact(
        @RequestParam(name="c", required = false) Long categoryId
        , @RequestParam(name="q", required = false) String query
        , @RequestParam(name="p", required = false, defaultValue = "1") Integer page
        , @CookieValue(name="menus", required = false) String cookie
        , @AuthenticationPrincipal WebUserDetails userDetails
        , HttpServletResponse response
        , Model model) {

        Long memberId = null;
        // param으로 받아온 사용자 정보가 null이 아니라면 memberId에 사용자 정보를 get해서 넣음
        if (userDetails != null)
            memberId = userDetails.getId();

        System.out.println("category:"+categoryId);
        System.out.println("page:"+page);
        List<Category> categoryList = categoryService.getList();

        //List<MenuView> menuList = service.getListByCategoryId(categoryId);
        List<MenuView> menuList = new ArrayList<>();
        int count=0;

        if (categoryId != null) {
            menuList = service.getList(memberId, page, categoryId);
            count = service.getCount(categoryId);
        }

        else if (query != null) {
            menuList = service.getList(memberId, page, query);
            count = service.getCount(query);
        }

        else {
            menuList = service.getList(memberId, page);
            count = service.getCount();
        }     

        model.addAttribute("cList", categoryList);
        model.addAttribute("mList", menuList);
        model.addAttribute("count", count);

        int cartTotalPrice = 0;
        int cartCount = 0;

        System.out.println(menuList.get(0).isLike());
        
        /* List 객체로 다시 변환해야함!
        (X) List<MenuView> cookieList = new Gson().fromJson(cookie, List.class);
        (1) MenuView[] list = new Gson().fromJson(cookie, Menu[].class);
        (2) Gson이 제공하는 TypeToken으로.... type을 맞춰줘라....*/ 
        
        if (cookie != null) { 
            
            String decodedCookieList = URLDecoder.decode(cookie, Charset.forName("utf-8"));
            Type menuListType = new TypeToken<List<MenuView>>(){}.getType();
            List<MenuView> cookieList = new Gson().fromJson(decodedCookieList, menuListType);
            //cookieList = new Gson().fromJson(cookie, List.class);

            // for(int i=0; i<cookieList.size(); i++)    
            //     cartTotalPrice = cookieList.get(i).getPrice();

            for (MenuView coo : cookieList) 
                cartTotalPrice += coo.getPrice();
            
            cartCount = cookieList.size();
        }
       
        

        model.addAttribute("cartTotalPrice", cartTotalPrice);
        model.addAttribute("cartCount", cartCount);
    
        System.out.println("count내놔 : " + count);
        System.out.println("장바구니 품목 수 내뇨ㅏ : " + cartCount);
        System.out.println("장바구니 총 가격 내놔 : " + cartTotalPrice);

        // return하는 html 파일들이 저장된 경로의 "/"는 templates임. 여기를 기준으로 쓰자
        return "menu/list-react";
    }

    @GetMapping("detail")
    public String detail(@RequestParam Long id, Model model) {
        Menu menu = service.getById(id);
        
        model.addAttribute("menu", menu);
        return "menu/detail";
    }
}
