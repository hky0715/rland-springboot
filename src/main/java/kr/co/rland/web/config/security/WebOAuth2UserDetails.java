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
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Member;
import kr.co.rland.web.entity.MemberRole;
import kr.co.rland.web.repository.MemberRepository;
import kr.co.rland.web.repository.MemberRoleRepository;

@Service
public class WebOAuth2UserDetails implements OAuth2UserService<OAuth2UserRequest,OAuth2User> {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // WebSecurityConfig에서 spring security가 사용자 정보를 못받았음!!! 여기서는 어케 받아야하지???????
        // 로컬로그인과 겹칠 경우를 생각해야.. 구글은 전화번호, 이름은 수집하지 않으니까 이메일로 중복 여부를 판별해야함
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();

        // 서비스를 통해 사용자 정보를 load할 수 있다
        OAuth2User oAuth2User = service.loadUser(userRequest);
        System.out.println(oAuth2User);

        System.out.println("------attributes------");
        System.out.println(oAuth2User.getAttributes());

        System.out.println("------authorities------");
        System.out.println(oAuth2User.getAuthorities());
        
        System.out.println("------name------");
        System.out.println(oAuth2User.getName());

        System.out.println("------token------");
        System.out.println(userRequest.getAccessToken());
        System.out.println(userRequest.getClientRegistration().getRegistrationId());

        // 이건 로그인 한게 아님! 스프링시큐리티는 원하는 정보가 이것보다 더 많음!!!
        // 인증된 정보를 그저 가져와서 담았을 뿐, 부족한 정보가 많으니 더 추가해서 넣어야 한다!
        WebUserDetails userDetails = new WebUserDetails();
        userDetails.setAttributes(oAuth2User.getAttributes());
        userDetails.setName(oAuth2User.getName());        


        // 추가해서 넣자~~~~
        Member member = repository.findByMembername(oAuth2User.getName());
        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());

        List<GrantedAuthority> authorities = new ArrayList<>();

        for (MemberRole role : roles) 
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
                
        userDetails.setId(member.getId());
        userDetails.setUsername(member.getUsername());
        userDetails.setEmail(member.getEmail());
        userDetails.setPassword(member.getPwd());
        userDetails.setAuthorities(authorities);

        return userDetails;

        // throw new UnsupportedOperationException("Unimplemented method 'loadUser'");
        // return oAuth2User;

    }

}



    
