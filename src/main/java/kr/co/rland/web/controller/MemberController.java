package kr.co.rland.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.service.MemberService;


@Controller
@RequestMapping("user")
public class MemberController {

    @Autowired
    private MemberService service;
    
    @GetMapping("signin")
    public String signin() {
        // *.html을 알아서 찾아줘요 기특해
        // view엔진에게 화면을 달라고 요청. forwarding
        return "user/signin";
    }

    @PostMapping("signin")
    public String signin(String username
                        , String password
                        , HttpServletResponse response){
                        //, HttpSession session) {

        //id/pw가 일치하는지 확인하자.
        boolean valid = service.validate(username, password);
        //Member member = service.getByUsername(username);

        // 세션저장소를 만들자. 
        if(!valid) 
            return "redirect:signin?error";
        
        // cookie는 서버 및 세션에 저장하지 않고, 클라이언트에게 전달해야함
        Cookie uidCookie = new Cookie("uid", "1");
        uidCookie.setPath("/");
        Cookie usernameCookie = new Cookie("username", "newlec");
        usernameCookie.setPath("/");

        //session.setAttribute("uid", "1");
        //session.setAttribute("username", "newlec");
        response.addCookie(uidCookie);
        response.addCookie(usernameCookie);

        // *.html을 알아서 찾아줘요 기특해
        // post! 로그인을 했으니 index 페이지로 가라고 알려조용. redirect
        return "redirect:/index";
    }
}
