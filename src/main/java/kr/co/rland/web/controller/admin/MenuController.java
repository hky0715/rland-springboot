package kr.co.rland.web.controller.admin;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.config.security.WebUserDetails;
import kr.co.rland.web.entity.Category;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.CategoryService;
import kr.co.rland.web.service.MenuService;

@Controller("adminMenuController")
@RequestMapping("admin/menu")
public class MenuController {

    @Autowired
    private MenuService service;

    @Autowired
    private CategoryService categoryService;
    
    @GetMapping("reg")
    public String reg() {
        return "admin/menu/reg";
    }

    @PostMapping("reg")
    public String reg (
        // String korName
        //                 , String engName
        //                 , MultipartFile imgFile
        //                 , Integer price
                        Menu menu
                        // binary 전송방식! 맨땅!
                        , @RequestParam("img-file") MultipartFile imgFile
                        , HttpServletRequest request
                        , Principal principal
                        ) throws IllegalStateException, IOException {
        
                            

        String fileName = imgFile.getOriginalFilename();

        // 파일 저장
        if (imgFile != null && !imgFile.isEmpty()) {
            System.out.println(fileName);
            // Menu menu = Menu.builder()
            //             .korName(korName)
            //             .engName(engName)
            //             .price(price)
            //             .img(imgFile.getOriginalFilename())
            //             .build();

            String path = "/image/menu";   // webapp의 root
            String realPath = request.getServletContext().getRealPath(path);

            System.out.println(realPath);

            // linux에선 path도 file임! 타입이 다른 file!
            File pathFile = new File(realPath);

            if(!pathFile.exists())
                pathFile.mkdirs();   // mkdir : 기술한 디렉토리 하나만. mkdirs : 기술한 경로의 디렉토리 싹 다!

            //File file = new File(realPath+"/"+fileName);
            File file = new File(realPath+File.separator+fileName);

            imgFile.transferTo(file);
        }
        
        /*  context - authentication - ..... - userdetails
        // custom userdetails 를 만들어서 사용할 수도 있음
        // menu.setRegMemberId(principal.getName()); */
        menu.setRegMemberId(1997);
        menu.setCategoryId(1);

        menu.setImg(fileName);

        int affected = service.add(menu);

        System.out.println("***");
        System.out.printf("affected:%d\n",affected);
        System.out.printf("imgFile:%s\n",imgFile);
        System.out.println("***");

        System.out.println(menu);

        return "redirect:list";
    }

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
        return "admin/menu/list";
    }
    
}
