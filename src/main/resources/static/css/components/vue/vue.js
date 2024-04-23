// 3,4는 모델! 모델을 사용하겠다고 mount 해주는것~
// document 객체를 몰라도!!! 만들수있어!!!!!! 걍 view에 꽂아넣고 model만 바꿔라!!!!!!!!!
const { createApp } = Vue

    createApp({
        data() {
            return {
                x:3,
                y:4
            }
        }
    }).mount('#form-section');