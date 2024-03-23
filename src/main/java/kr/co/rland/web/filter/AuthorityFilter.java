package kr.co.rland.web.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

//@WebFilter("/")
//@Component
public class AuthorityFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        System.out.println("Is filter started?");

        // chain으로 다음에 나올 페이지를 연결해줘야만 다음 페이지가 나옴!
        chain.doFilter(request, response);
        
    }

}