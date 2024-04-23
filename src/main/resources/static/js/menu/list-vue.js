const { createApp } = Vue

// model없음! 그럼 얘는 calc.js의 계산기 object를 어케 쓰지????
// html에서 tag로 갖다쓸 수 있어!!!! vue component니까 화면에서 써야해!!!
createApp({
    data() {
        return {
            query:""
        }
    },
    methods:{
        queryClickHandler() {
            console.log(this.query);
        }
    }
}).mount('main');

