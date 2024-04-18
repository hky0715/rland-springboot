package kr.co.rland.web.config.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Member;
import kr.co.rland.web.entity.MemberRole;
import kr.co.rland.web.repository.MemberRepository;
import kr.co.rland.web.repository.MemberRoleRepository;

// Security가 요구하는 UserDetailsService를 impl하기 때문에, 따로 서비스를 가져다쓰지 않아도 스프링이 알아서 찾아준다~~ 이말이야~~
@Service
public class WebUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    // UserDetails는 권한, 사용자 정보를 담고있음. 이 놈을 이제 내가 원하는 타입으로 셋팅해야지!
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = repository.findByMembername(username);
        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());

        List<GrantedAuthority> authorities = new ArrayList<>();

        for (MemberRole role : roles) 
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        
        // authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        // authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));

        
        WebUserDetails userDetails = new WebUserDetails();
        userDetails.setId(member.getId());
        userDetails.setUsername(member.getUsername());
        userDetails.setEmail(member.getEmail());
        userDetails.setPassword(member.getPwd());
        userDetails.setAuthorities(authorities);

        return userDetails;
    }
    
}
