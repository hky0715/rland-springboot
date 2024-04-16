package kr.co.rland.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

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
				.permitAll()
			)
			.logout((logout) -> logout
                .logoutUrl("/user/signout")
                .logoutSuccessUrl("/index")
                .permitAll());

		return http.build();
	}

	@Bean
	// 데이터베이스 쿼리를 해서 사용자 정보를 제공하는 제공자
	public UserDetailsService jdbcUserDetailsService() {
//      -> 결과 집합의 모양
//         ┌────────────┬───────────┬─────────┐
//         │  username  │  password │ enabled │
//         ├────────────┼───────────┼─────────┤
//         │   newlec   │    111    │    1    │
		String userSql = "select username, pwd password, 1 enabled from member where username = ''";
		String authorSql = "";

		//너는 쿼리만 줘라
		JdbcUserDetailsManager manager = new JdbcUserDetailsManager(userSql);

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
}
