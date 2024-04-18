package kr.co.rland.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuView {
    private long id;
	private String korName;
	private String engName;
	private int price;
	private String img;
	private Date regDate;
	private int categoryId;
	private int likeCount;
	private boolean like; 
	/*wrapper쓰기. https://ratseno.tistory.com/101
	boolean type은 lombok에 의해 getter, setter를 만들 경우 자동으로 prefix로 'is'를 붙인다..
	그래서 getLike가 아니라, isLike로 getter가 자동으로 생성된다. 이게 싫다면 Wrapper 클래스로 entity를 선언해줘도 된다
	*/
		
}
