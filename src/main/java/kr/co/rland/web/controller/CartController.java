package kr.co.rland.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.service.MenuService;

@Controller
@RequestMapping("cart")
public class CartController {

    @Autowired
    private MenuService menuService;

    @GetMapping("list")
    public String list(@CookieValue String menus, Model model) {
        //decode
        //System.out.println(menus);
        List<Menu> menuList;
       
        if (menus == null)
            menuList = new ArrayList<>();

        else {
            // decode
            String menusStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
            // make object
            //Menu menu = new Gson().fromJson(menus, Menu.class);
            menuList = new Gson().fromJson(menusStr, List.class);
        }

        
        model.addAttribute(menus, menuList);
        return "cart/list";
    }

    @PostMapping("add-menu")
    public String addMenu(Long id
                        , @CookieValue(required=false) String menus
                        , HttpServletResponse response) {

        List<Menu> menuList;
        {
            // 기존에 있던 쿠키를 먼저 확인하고
            if (menus == null)
                menuList = new ArrayList<>();

            else {
                String menusStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
                menuList = new Gson().fromJson(menusStr, List.class);
            }

            // 새로 메뉴를 찾아서 카트 리스트에 담아
            Menu menu = menuService.getById(id);
            menuList.add(menu);
        
        }
        
        // Menu => json 으로 바꾸는 툴이 필요해!
        String menusStr = new Gson().toJson(menuList);
        System.out.println(menusStr);


        // StringBuilder menus = new StringBuilder();
        // // Menu가 이미 쿠키에 담겨있다면
        // menus.append("\n");
        // menus.append(menu.getId());
        // menus.append(",");
        // menus.append(menu.getKorName());

        // String menusStr = menus.toString();
        // 쿠키에는 한글도 못넣고 '\'도 못넣고... 그래서 인코딩을 해야함
        String menuEncoded = "";
        try {
            menuEncoded = URLEncoder.encode(menusStr, "utf-8");
        } catch(UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        Cookie menusCookie = new Cookie("menus", menuEncoded);
        response.addCookie(menusCookie);
//      response.addCookie(new Cookie("menuIds", menus.toString()));
        
        return "redirect:/menu/list";
    }

}
