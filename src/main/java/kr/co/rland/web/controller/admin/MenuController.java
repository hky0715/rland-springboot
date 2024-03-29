package kr.co.rland.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.co.rland.web.entity.Menu;

@Controller("adminMenuController")
@RequestMapping("admin/menu")
public class MenuController {
    
    @GetMapping("reg")
    public String reg() {
        return "admin/menu/reg";
    }

    @PostMapping("reg")
    public String reg(
        // String korName
        //                 , String engName
        //                 , MultipartFile imgFile
        //                 , Integer price
                        Menu menu
                        // binary 전송방식! 맨땅!
                        , @RequestParam("img-file") MultipartFile imgFile) {
        
        String fileName = imgFile.getOriginalFilename();
        System.out.println(fileName);
        // Menu menu = Menu.builder()
        //             .korName(korName)
        //             .engName(engName)
        //             .price(price)
        //             .img(imgFile.getOriginalFilename())
        //             .build();

        System.out.println(menu);

        return "redirect:list";
    }

    @GetMapping("list")
    public String list() {

        return "admin/menu/list";
    }

    
}
