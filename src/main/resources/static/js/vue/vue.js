/* x=3,y=4는 모델?! 모델을 사용하겠다고 mount 해주는것~
data : model을 return해주는 option
document 객체를 몰라도!!! 만들수있어!!!!!! 걍 view에 꽂아넣고 model만 바꿔라!!!!!!!!!*/
import Calc from "./calc.js";
const { createApp } = Vue

// model없음! 그럼 얘는 calc.js의 계산기 object를 어케 쓰지????
// html에서 tag로 갖다쓸 수 있어!!!! vue component니까 화면에서 써야해!!!
createApp({
    components:{
        Calc
    }
}).mount('.holder');