package kr.co.rland.web.config.security;

import java.io.IOException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import kr.co.rland.web.entity.Member;

@Configuration
public class WebSecurityConfig {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private WebOauth2UserDetailsService oauth2UserDetailsService;

    @Autowired
    private LoginSuccessHandler loginSuccessHandler;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    // method chaining
    /* 권한, 인가 관리를 Security Filter Chain이 알아서 한다. 모든 페이지에 들어가기 전에 필터체인이 먼저 걷어채서, 앞단에서 filtering해준다
    filtering하기 위해서는 멤버정보를 먼저 얻어내야하니까..! userDetails이 필요하지.
    userDetails =>
    1: 메모리, DB를 써야하니까 이건 별루.......
    2: JDBC, userDetailsService에는 role, username, password밖에 없었지.
    그래서 추가로 필요한 정보를 successful handler를 구현해서 세션에 담아서 쓸 수 있지만.... 세션과 쿠키를 사용하기 보다는!
    3: userDetailsService를 내가 원하는대로 커스터마이징해서 쓰기로 했다
     */
    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
            .csrf(csrf->csrf.disable())
			.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/member/**").hasRole("ADMIN")
                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "MEMBER")
				.anyRequest().permitAll()
                
			)
			.formLogin((form) -> form
				.loginPage("/user/signin")
                // .successHandler(new AuthSuccessHandler())
                .successHandler(loginSuccessHandler)
				.permitAll()
			)
            // 설정하면 사용자정보를 얘가 주는데! 그걸 어떻게 받고 쓸지 내가 구현해야 함
            // client가 구글과 대화를 나눈 뒤, 구글 서버의 주소로 가서 사용자 정보를 받아온다!
            .oauth2Login(config->config
                .userInfoEndpoint(userInfo->userInfo
                // .userService(oauth2UserDetailsService)))
                .userService(oauth2UserDetailsService))
                .successHandler(loginSuccessHandler))
			.logout((logout) -> logout
                .logoutUrl("/user/signout")
                .logoutSuccessUrl("/index")
                .permitAll());

		return http.build();
	}

	//@Bean
	// 데이터베이스 쿼리를 해서 사용자 정보를 제공하는 제공자
	public UserDetailsService jdbcUserDetailsService() {
//      -> 결과 집합의 모양
//         ┌────────────┬───────────┬─────────┐
//         │  username  │  password │ enabled │
//         ├────────────┼───────────┼─────────┤
//         │   newlec   │    111    │    1    │
		String userSql = "select username, pwd password, 1 enabled from member where username = ?";

//      -> 결과 집합의 모양
//         ┌────────────┬───────────┐
//         │  username  │ authority │ 
//         ├────────────┼───────────┤
//         │   newlec   │ROLE_ADMIN │
//         │   newlec   │ROLE_MEMBER│
		String authorSql = """
                            SELECT 
                                m.username, mr.role_name authority
                            FROM
                                member m RIGHT JOIN member_role mr
                            ON m.id = mr.member_id
                            WHERE m.username = ?
                                """;

		//너는 쿼리만 줘라!
        // datasource는 application.yaml에 기재되어있고, IOC에 담겨있음
		JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        manager.setUsersByUsernameQuery(userSql);
        manager.setAuthoritiesByUsernameQuery(authorSql);

		return manager;
	}

    // @Bean
    // 메모리상에서 사용자 정보를 주는 서비스. 이 bean을 지워버리면 jdbc로 갖고와야징
    public UserDetailsService userDetailsService() {
        // 사용자 정보를 담은 객체
        UserDetails user = User.builder()
                                .username("newlec")
                                .password("{noop}1111")
                                .roles("USER", "ADMIN")
                                .build();

        UserDetails user2 = User.builder()
                                .username("dragon")
                                .password("{noop}1111")
                                .roles("USER")
                                .build();

        return new InMemoryUserDetailsManager(user, user2);
    }

    // 로그인 성공한 후에 추가로 필요한 정보를 세션에 담아서 쓸 수 있어
    // class AuthSuccessHandler implements AuthenticationSuccessHandler {

    //     @Override
    //     public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
    //             Authentication authentication) throws IOException, ServletException {
    //         HttpSession session = request.getSession();
    //         String username = authentication.getName();
    //         Member member = memberRepository.findByUsername(username);
    //         session.setAttribute("email", member.getEmail());
    //     }
    // }
}
