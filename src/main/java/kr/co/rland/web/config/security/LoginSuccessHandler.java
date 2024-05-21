package kr.co.rland.web.config.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
                System.out.println("========================================succsess =========");
                String url = "/";

                WebUserDetails userDetails = (WebUserDetails) authentication.getPrincipal();

                if(userDetails.getAuthorities() == null){
                    request.logout();
                    SecurityContextHolder.clearContext();
                    HttpSession session = request.getSession(false);
                    if(session!=null)
                        session.invalidate();

                    url = "/user/signup";
                }

                redirectStrategy.sendRedirect(request, response, url);
    }


}