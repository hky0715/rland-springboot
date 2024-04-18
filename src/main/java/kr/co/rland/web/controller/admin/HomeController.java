package kr.co.rland.web.controller.admin;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import kr.co.rland.web.config.security.WebUserDetails;

@Controller("adminHomeController")
@RequestMapping("admin")
public class HomeController {

    /* dispatcher에게 param으로 principal, authentication, userdetails을 달라고 하면.... 스프링이 모르는 자료형이니까 null을 준다 
     * 니가 아는 놈이야! 라고 알려주려면 지시서가 있어야하지...
    */
    @GetMapping("index")
    public String index(HttpServletRequest request
                , @CookieValue(required = false) Long uid
                , Principal principal
                , Authentication authentication
                , @AuthenticationPrincipal WebUserDetails userDetails) {//HttpSession session) {

        // customUserDetails 사용방법 2 : userDetails를 직접 param으로 받아와!
        System.out.println("WebUserDetails을 param으로 해서 받은 이메일 : " + userDetails.getEmail()); // null! 지시서가 없으면 못받아!!!!
       
        // CustomUserDetails 사용방법 1
        // WebUserDetails userDetails = (WebUserDetails)authentication.getPrincipal();
        // System.out.println("authentication에서 principal을 받고, principal에서 꺼낸 이메일 : " + userDetails.getEmail());
        
        // 방법 1
        // holder안에 context, context안에 authentication이 있고, authentication 안에 principal이 이따!
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
