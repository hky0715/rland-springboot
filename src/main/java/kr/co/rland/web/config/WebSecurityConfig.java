package kr.co.rland.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
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
    // 사용자 정보를 주는 서비스
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
