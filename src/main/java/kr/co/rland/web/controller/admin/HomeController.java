package kr.co.rland.web.controller.admin;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Controller("adminHomeController")
@RequestMapping("admin")
public class HomeController {

    @GetMapping("index")
    public String index(HttpServletRequest request
                , @CookieValue(required = false) Long uid
                , Principal principal) {//HttpSession session) {
        
        // 방법 1
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication auth = context.getAuthentication();
        // String username = auth.getName();
        // System.out.println(username);

        // 방법 2
        // 여기서의 principal은 user details의 principal임. context에서 가져온 것이 아니래!
        String username = principal.getName();
        System.out.println(username);


        // 쿠키를 다ㅏㅏㅏ가져와서 내가 원하는 쿠키를 하나하나 꺼내봤어야 했음
        // Cookie[] cookies = request.getCookies();

        System.out.println(uid);

        // 원래 쿠키나 세션에 있는 uid를 확인했어야 했는데, 이제 Spring security를 쓴다!
//      if (session.getAttribute("uid") == null)
//          return "redirect:/user/signin";
        // if (uid == null)
        //     return "redirect:/user/signin";

        return "admin/index";
    }
    
}
