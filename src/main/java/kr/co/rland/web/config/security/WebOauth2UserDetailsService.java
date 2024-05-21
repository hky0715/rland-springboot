package kr.co.rland.web.config.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Member;
import kr.co.rland.web.entity.MemberRole;
import kr.co.rland.web.repository.MemberRepository;
import kr.co.rland.web.repository.MemberRoleRepository;

@Service
public class WebOauth2UserDetailsService  implements OAuth2UserService<OAuth2UserRequest,OAuth2User>{

    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest);
        // System.out.println(oAuth2User);

        String username = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        Member member = repository.findByEmail(email);

        WebUserDetails userDetails = new WebUserDetails();
        userDetails.setAttributes(oAuth2User.getAttributes());
        userDetails.setName(oAuth2User.getName());
        userDetails.setUsername(username);

        System.out.println("========================================"+userDetails.getName());
        System.err.println(member);

        if(member==null)
            return userDetails;


        //secutiry info
        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());

        List<GrantedAuthority> authorities = new ArrayList<>();

        for(MemberRole role : roles){
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        }

        userDetails.setId(member.getId());
        userDetails.setUsername(member.getUsername());
        userDetails.setPassword(member.getPwd());
        userDetails.setEmail(member.getEmail());
        userDetails.setAuthorities(authorities);

        return userDetails;
    }




}