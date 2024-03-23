package kr.co.rland.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {
    
    @GetMapping("index")
    
    // model을 dispatcher servlet이 맹글어준다
    public String index(Model model) {
        // *.html을 알아서 찾아줘요 기특해
        model.addAttribute("m", "hello!!!!!!!!");
        return "index";
    }
}
