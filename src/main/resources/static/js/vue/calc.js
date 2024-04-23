// vue.js에서 구현부분을 잘라내서 붙였음! export default해서 노출시켜서 쓰자!
export default {
    data() {
        return {
            x:3,
            y:4,
            result:0
        }
    },
    methods:{
        calcSubmitHandler() {
            console.log("aa");
            this.result = this.x + this.y;
        }
    },
    template:`
    <section id>
    <h1>덧셈 계산기</h1>
    <form>
        <fieldset>
            <legend>계산기 입력폼</legend>
            <div>
                <label>x:</label>
                <input dir="rtl" name="x" v-model.number.trim="x">
                <label>y:</label>
                <input dir="rtl" name="y" v-model.number.trim="y">
                <span>=</span>
                <span v-text="result">0</span>
                <span>{{x+y}}</span>
            </div>
            <hr>
            <div>
                <input type="submit" name="cmd" value="초기화">
                <input type="submit" name="cmd" value="계산하기" @click.prevent="calcSubmitHandler">
            </div>
        </fieldset>
    </form>
</section>`
}