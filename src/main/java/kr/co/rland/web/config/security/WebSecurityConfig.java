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

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    // method chaining
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
				.permitAll()
			)
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
