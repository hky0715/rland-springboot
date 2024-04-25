const { createApp } = Vue

// model없음! 그럼 얘는 calc.js의 계산기 object를 어케 쓰지????
// html에서 tag로 갖다쓸 수 있어!!!! vue component니까 화면에서 써야해!!!
createApp({
    data() {
        return {
            query:"",
            list:[
            {korName:"아메리카노", engName:"Americano"},
            {korName:"카페라떼", engName:"Latte"}]
        }
    },
    methods:{
        queryClickHandler() {
            this.list.push({});
        }
    },
    beforeCreate(){
        console.log("beforeCreate");
    },
    async created(){
        console.log("created");
        let response = await fetch("/api/menus");
        let list = await response.json();
        this.list = list;
    },
    beforeMount(){
        console.log("beforeMount");
    },
    mounted(){
        console.log("mounted");
    },
    beforeUpdate(){
        console.log("beforeUpdate");
    },
    updated(){
        console.log("updated");
    },
    beforeUnmount(){
        console.log("beforeUnmount");
    },
    unmounted(){
        console.log("unmounted");
    },
    activated(){
        console.log("activated");
    },
    deactivated(){
        console.log("deactivated");
    },

}).mount('main');

