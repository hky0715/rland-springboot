package kr.co.rland.web.config;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import kr.co.rland.web.entity.Menu;

public class LambdaTest {
    public static void main(String[] args) {
        List<Menu> list = new ArrayList<>();


        list.add(Menu.builder().id(1).korName("아하").build());
        list.add(Menu.builder().id(3).korName("어흥").build());
        list.add(Menu.builder().id(2).korName("이히").build());
        list.add(Menu.builder().id(7).korName("유후").build());
        list.add(Menu.builder().id(4).korName("에헤").build());

        System.out.println(list);

        class AAA implements Comparator<Menu> {

            @Override
            public int compare(Menu o1, Menu o2) {
               return (int) (o1.getId() - o2.getId());
            }
        }

        AAA aaa = new AAA();
        /* 
        그저 Comparator 인터페이스를 구현한 함수 하나만 쓰고싶었을 뿐인데........
        클래스까지 만들고 귀찮다 귀찮아 
        클래스명 안 쓰면 안돼???? 아 되지 ^_^

        Comparator<Menu> aaa = new AAA(); 이러케!

        근데 그러면 
        Comparator<Menu> aaa = new Comparator<Menu>();
        이것도 되는거 아냐? ㄴㄴ 안댐 왜냐면 인터페이스는 new 해서 생성할 수 없거든

        근데 그러면 말야
        Comparator<Menu> aaa = new Comparator<Menu>() {
             @Override
            public int compare(Menu o1, Menu o2) {
               return (int) (o1.getId() - o2.getId());
            }
        };
        이건 됨ㅋ 이건 익명클래스거든! 구현체를 가지고 있는 인터페이스니까 가넝가넝
        Anonymous classes are inner classes with no name.
        */

        
        /*함수명도 이제 필요없어ㅋ */
        Comparator<Menu> bbb1 = (Menu o1, Menu o2)->{
            return (int)(o1.getId() - o2.getId());
        };

        /*블럭, 그리고 return이 함께 있으면 이를 함께 생략할 수 있게 함.*/
        Comparator<Menu> bbb2 = (Menu o1, Menu o2) -> (int)(o1.getId() - o2.getId());

        /*그리고 이제 Param의 자료형도 필요없어.*/
        /*Comparator<Menu> bbb3 = (o1, o2) -> (int)(o1.getId() - o2.getId());*/

        list.sort(aaa);
        list.sort((o1, o2) -> (int)(o1.getId() - o2.getId()));

        System.out.println(list);

    }
}
