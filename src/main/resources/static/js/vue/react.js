let hello = "hello";
// react는 DOM을 함께 사용한다. react는 rendering해주는 놈이기 때문에 DOM을 잘해야함ㅋ
let clickHandler = function(e) {
    e.preventDefault();
    console.log("aaaaaaa!");
}

// ReactDOM.render(
    let calc = function() {
       return  
    `<section>
    {/*<!-- 꽂아넣고자 하는 곳엔 무조건 id/class selector를 써야함 -->*/}
    <h1>덧셈 계산기</h1>
    <form>
        <fieldset>
            <legend>계산기 입력폼</legend>
            <div>
                <label>x:</label>
                <input dir="rtl" name="x"/>
                <label>y:</label>
                <input dir="rtl" name="y"/>
                <span>=</span>
                <span>0</span>
                <span>{hello}</span>
            </div>
            <hr/>
            <div>
                <input type="submit" name="cmd" value="초기화"/>
                <input onClick={clickHandler} type="submit" name="cmd" value="계산하기"/>
            </div>
        </fieldset>
    </form>
    </section>,
    document.querySelector("#root")`

};