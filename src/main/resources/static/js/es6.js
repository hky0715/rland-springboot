// Set, List, Map Collection 
{
    let set = new Set([3,5,2,3,4,7,5,3,6]);
    console.log(`길이 얼매냐? : ${set.size}`);

    set.delete(5);
    console.log(`지웠지롱. 길이가 얼마냐? : ${set.size}`);

    set.add(10);
    console.log(`하나 더했지롱. 길이가 얼매냐? : ${set.size}`);

    set.clear();
    console.log(`클리어해찌롱 : ${set.size}`);
}


// symbol + computed property
{
    const getList = Symbol();

    class NoticeServiceImp /*implements NoticeService*/ {
        [getList](){
            return "hehehe list";
        }
    }

    class NoticeController {
        constructor() {
            // NoticeService service = new NoticeServiceImp();
            this.service = new NoticeServiceImp();
        }

        printList() {
            console.log(this.service[getList]());
        }
    }

    let controller = new NoticeController();
    controller.printList();
}



// Inheritance
// 틀로 쓰긴 적합하나, 아예 그대로 가져다 쓰기엔 부족하니까 내가 고쳐 쓰겠다고!
{
    class Exam {
        #kor 
        #eng 
        #math

        constructor(kor=20, eng=0, math=0) {
            this.#kor = kor;
            this.#eng = eng;
            this.#math = math;
        }

        get kor(){            return this.#kor;        }
        set kor(value) {      this.#kor = value;       }
        get eng(){            return this.#eng;        }
        set eng(value) {      this.#eng = value;       }
        get math(){           return this.#math;       }
        set math(value) {     this.#math = value;      }
        total() {            return this.kor + this.eng + this.math;        }
    }

    class NewlecExam extends Exam {
        #com

        constructor(com=0) {
            super();            // super를 꼭!!!! 써야함!
            this.#com = com;
        }

        total() {
            return (super.total() + this.#com);
        }

        // 나한테 total이 없으니 부모에게서 물려받은 total이 this.total이 됨
        avg() {
            // return (this.total() + this.#com) / 4;
            return this.total() / 4;
        }
    }

    console.log(`newlec exam : ${new NewlecExam().total()}`);
    console.log(`newlec exam avg : ${new NewlecExam().avg()}`);
}


{
    /* JS는 클래스를 module화 하지 않는가?
    기존엔 html의 도움을 받아 module화 되어있었다아아............. JS에서 다른 JS를 가져올 수 없었음
    node.js는 그래서 common.js를 가져다가 모듈화를 했었음
    이제 모듈화를 슬슬 지원하고 있다고는 하는데 아직 좀 그렇다네????? */

    class Exam {
        #kor 
        #eng 
        #math
        static #staticVariable

        static {
            this.#staticVariable = 30;
        }

        static getStaticVariable() {
            return Exam.#staticVariable;
        }
        
        static get staticVariable() {
            return Exam.#staticVariable;
        }

        constructor(kor=2, eng=0, math=0) {
            this.#kor = kor;
            this.#eng = eng;
            this.#math = math;
        }

        get kor(){
            return this.#kor;
        }

        set kor(value) {
            this.#kor = value;
        }

        get eng(){
            return this.#eng;
        }

        set eng(value) {
            this.#eng = value;
        }

        get math(){
            return this.#math;
        }

        set math(value) {
            this.#math = value;
        }
        
        // private method, only use in class
        #total() {
            return this.kor + this.eng + this.math;
        }
    }

     // static 사용하기
    // 객체를 통한게 아니라 개체명을 통해서 사용할 수 있어야 하는 것이 포인트!
    // console.log(`Exam.#staticVariable: ${Exam.getStaticVariable()}`);
    console.log(`Exam.#staticVariable: ${Exam.staticVariable}`);

}


// Class, OO...!
{
    function createExam() {
        return class Exam {
            #kor     // private identifier
            #eng
            #math

            constructor(kor=2, eng=0, math=0) {
                this.#kor = kor;
                this.#eng = eng;
                this.#math = math;
            }

            // getter...             getKor() {
            get kor(){
                return this.#kor;
            }

            set kor(value) {
                this.#kor = value;
            }

            total() {
                return this.kor + this.eng + this.math;
            }
        }
    }

    // 변수로 객체를 만드는 괴상함. 쓰지말.......
    let ExamClass = createExam();
    let exam = new ExamClass();

    /* #을 쓰게 됨으로서 function 외부에서는 값을 직접 호출 및 대입할 수 없어, getter/setter를 부득이하게 사용해야 했음
    하지만 es6에서! get kor, set kor 이렇게 선언해주면 이것이 getter, setter의 역할을 하며...!
    */

    // exam.setKor(exam.getKor()+1);    요랬는데
    // exam.kor++;                      요래됐슴당

    console.log(exam);
    // console.log("ExamClass total : ", exam.total(), exam.getKor());
    console.log("ExamClass total : ", exam.total(), exam.kor);
}


// Arrow function
{
    {
        let arr = [2, 3, 45, 22, 1, 5, 12];
        arr.sort((a,b) => a-b);
        console.log("오름차순! : ", arr);

        arr.sort((a,b) => b-a);
        console.log("내림차순! : ", arr);
    }

    // arrow function은 코드를 전달해야 하는 경우를 간결하게 하기 위한 표기법으로 시작했음^^
    {
        let arr = [[2,3], [45,22], [1,5,12]];
        // arr.sort((a,b)=>a[0]-b[0]);
        // console.log(arr);
        
        arr.sort((a,b)=>b[0]-a[0]);
        console.log(arr);
    }


    let exam = {
        /*객체의 속성!*/
        kor: 10,
        eng: 20,

        // total: function() {
        //     return this.kor + this.eng;
        // }
        // 퀴즈! 함수를 Arrow Function으로 바꿀 수 있을까?
        /*this.*/total:() => {
            return this.kor+this.eng;
        },
        delayedPrint() {    // 얘는 exam.delayedPrint()니까 this -> exam
            // 3초 뒤 다음 callback이 호출되면 this.kor가 undefined가 나온다. 왜?
            // 그 이유는 setTimeout은 3초 뒤, 호출하는 주체 없이 혼자 뿅! 하고 실행되는 콜백함수. 그래서 this가 없어.....
            
            /*
            setTimeout(function() {
                console.log("delayed .. call", this.kor);
            }.bind(this), 3000);    // this도 같이 전달하고 싶어? 대안이 있지. 그럼 this랑 bind로 엮어!
            */

            // 내 안에 this가 없는 arrow function.... 그래서 밖의 this를 쓸 수 있는....???
            setTimeout(()=>{
                console.log("delayed .. call", this.kor);
            }, 3000);


            let f1 = function() {
                console.log(this);
            }

            /**
             *  위의 setTimeout이 3초 뒤 호출하는 모양은 어떤 모양인가?
             * 1. f1(); this->window
             * 2. exam.f1(); this->exam
             * 3. f1().apply(exam); this-> exam
             * 
             
            */ 
        }

        
    };

    // 추가적인 내용 : apply, call, bind 메소드의 용법과 차이?
    function total() {
        return this.kor + this.eng;
    }

    // 이렇게 호출된 total에서의 this는 window 객체가 됨.
    // total을 호출하면서 this로 사용할 객체를 전달할 수 있는 방법이 이따?
    console.log("total : ", total());

    // 1. apply를 사용하는 방법. 배열로 보내주면 됨
    console.log("apply total : ", total.apply(exam, ["hello", "hihi"]));

    // 2. call을 사용하는 방법. spread! 나열하면 됨
    console.log("call total", total.call({kor:100, eng:90}, "good", "hi"));

    // 3. bind를 사용하는 방법
    /* 
    방법 1, 2는 내가 함수를 호출하는 입장할 때 사용하게 됨. 
    bind는 내가 호출을 부탁(위임)하는 경우에 객체를 지정하고 싶을때 씀 (eg. 콜백함수)
    */
    let aa = {
        name: "짜장면",
        closeCallback() {
            console.log("머먹지? : ", this.name);
        }
    }
    
    let onclose = aa.closeCallback.bind(aa);

    // 호출자는 어떻게 호출하지? 그냥 위임받은 함수를 참조하는 변수를 이용해서 call하게찌?
    onclose();



    /* 예제 1. 메소드로 사용할 수 있나?
    this가 있다는 것은 total() 메소드를 호출할 때 exam을 this로 받는다는 것을 말하는 것이다.
    Arrow Function은 그것(exam)을 받지 않음. 못 받음. 객체를 못 받으니 메소드를 쓸 수가 없다.
    따라서, total() 메소드의 연산은 undefined + undefined가 되어서 NaN이 된다.
    */
    console.log(exam.total());
    console.log(exam.delayedPrint());



    

    // 예제 2. 일반 함수로 사용할 수 있나?
    {
        // function add(a, b) {
        //     console.log("arguments length : ", arguments.length);
        //     return a+b;        
        // }

        let add = (a, b, ...args) => {
            //console.log("arguments length : ", arguments.length);
            console.log("rest arguments length : ", args.length);
            return a+b;        
        }

        console.log("add(3,4,5) : ", add(3,4,5));
        
        console.log(exam.delayedPrint());
    }

}


// Relation of Default value params and arguments
// Default value
{
    // function add(x, y=10, z){
    //     console.log("add = ",x,y,z);
    // }
    function getCount(){
        return 3;
    }

    // 값을 리턴받는 함수도, 같은 매개변수도 인자의 기본값으로 설정할 수 있다.
    function add(x, y=10, z=getCount(), a=z+1){
        console.log("length = ",arguments.length);
        console.log("add = ",x,y,z,a);

        console.log("인자값 바꾸기 전",
                    x == arguments[0],
                    x === arguments[0],
                    y == arguments[1],
                    y === arguments[1],
                    typeof arguments[1]
                    );
        x=60;
        y=11;
        console.log("인자값 바꾼 후",
                    x == arguments[0],
                    x === arguments[0],
                    y == arguments[1],
                    y === arguments[1],
                    );
    }

    // null은 값으로 인식??
    // add(10, null, 30);
    // add(10, undefined, 30);

    // arguments는 진짜로 메소드 호출 시 받은 인자 개수만 세어줌
    // 메소드에서 정의한 기본값은 받은 인자로 쳐주지 않음 !
    add(10);
    // add(10, 30);
    // add(undefined);
}


// Rest Parameter & Spread Operator
{
    // ...args : params that except params of function sum
    function sum(n1, n2, ...args) {
        let result = 0;

        // let length = arguments.length-2;
        // for (let i=0; i<length; i++)
        //     console.log(arguments[i+2]);

        for(let arg of args)
            console.log(arg);

        return n1+n2;
    }

    console.log("sum : ", sum(2,3));
    console.log("sum : ", sum(2,3,5,2,3,6,8));

    
    let kors = [20, 40, 20];
    console.log("sum spread by myself : ", sum(kors[0], kors[1], kors[2]));
    // 배열을 알아서 펼쳐서 계산해줘! spread해주라!
    console.log("sum spread auto : ", sum(...kors));
    
    let arr1 = [2, 3, 4];
    //let arr2 = [6, 5, arr1]; => [6, 5, 2, 3, 4]로 나오면 좋겄는디!
    let arr2 = [6, 5, ...arr1];

    // console.log("arr2[2] : ", arr2[2]);
    console.log("arr2 : " , arr2);

}


// Advanced Json #1 Array Desturcturing
{
    /*
    // 출력 : undefined, undefined, [10,20,50]
    let kor1, kor2, kor3 = [10, 20, 50];
    */

    // let [kor1, kor2, kor3] = [10, 20, 50];
    // let [kor1, kor2/*, kor3*/] = [10, 20, 50];
    // let [kor1, /*kor2*/, kor3] = [10, 20, 50];


    let arr = [10, 20, 50];
    let [kor1, , kor3] = arr;
    arr[0] = 60;

    // 일부 값이 변경된 배열을 다시 대입한다
    [kor1, , kor3] = arr;
    console.log("A1 : ", kor1, kor3);
    
    // swap!
    let x = 3;
    let y = 5;
    
    console.log("swap 전 : ", x, y);
    /*
    let t = x;
    x = y;
    y = t;
    */
    [x, y, z=100] = [y, x];
    console.log("swap 후 : ", x, y);
    console.log("z : ", z); // window.z


    
}


// Advanced Json #4-2 Object Destructuring : Nested
{
    let exam = {kor:20, eng:30, math:40, student:{id:1, name:'홍길동'}};

    // let name = exam.student.name;
    // let {kor, name} = exam <= name은 depth가 맞지 않는... 한단계 더 싸여있음. 성립할 수 없음
    let {kor, student:{name}} = exam;

    console.log("4-2 : ", kor, name);
}


// Advanced Json #4-1 alias, matching, changing, ..
{
    //function print(exam) {

    // 어차피 객체가 넘어올거니까, 그 객체를 뽀개면서 받아서 변수를 선언햌ㅋㅋㅋㅋㅋ 지역변수 3개가 뿅!
    // com : 중괄호에서도 변수를 선언할 수 있음! 다만 object에 없는 변수라면 초기화를 거치지 않는 이상 undefined가 될 뿐임
    function print({kor, eng:english, /*math*/ com=90}) {
       
        let total = kor + english + /*math*/ com;
        console.log("4 : ", kor, english, `com:${com}`, total);  

    }

    //print({kor:100, eng:100, math:40});
    let exam1 = {kor:10, eng:30, math:40};
    let {kor, eng} = exam1;
    exam1.kor++;
    exam1.eng+=2;

    // {kor, eng}는 바뀌지 않음. 왜냐면 JS의 모든 변수는 객체니까!
    console.log("4-1", exam1, {kor, eng});

    // 바뀐값을 다시 집어넣으려면? 선언없이 뽀개서 다시 넣어본다. 근데 선언없이 아래 구문을 수행하려면 오류나니까 소괄호로 감싼다.
    ({kor, eng} = exam1);

    console.log("4-1-1", exam1, {kor, eng});
}


// Advanced Json #4 Object Destructuring
{
    //function print(exam) {

    // 어차피 객체가 넘어올거니까, 그 객체를 뽀개면서 받아서 변수를 선언햌ㅋㅋㅋㅋㅋ 지역변수 3개가 뿅!
    function print({kor, eng, math}) {
        //let total = exam.kor + exam.eng + exam.math;
        //console.log(exam.kor, exam.eng, total);

        //낱개로 뽀개기(Destructuring)
        //let kor = exam.kor;
        //let eng = exam.eng;
        //let math = exam.math;

        //exam object의 속성을 각각 kor, eng, math에 대입해줌
        // let {kor, eng, math} = exam;

        let total = kor + eng + math;
        console.log(kor, eng, total);  

    }
    
    // 함수의 인자로 객체를 전달. 다만 뽀개서 쓰는 것
    print({kor:100, eng:100, math:40});
}

// Advanced Json #3 computed property
{
    let col="kor";
    let eng=40;
    let math=50;
    
    let exam = {[col]:10    // symbol을 사용하려면 변수가 있어야 함
            , eng
            , math
            , total(){
                return this.kor+this.eng+this.math;
    }};
    

    console.log("#3 : ", exam.kor, ",", exam.eng, ",", exam.math, ",", exam.total());
}

// Advanced Json #2 function
{
    let kor=30;
    let eng=40;
    let math=50;

    let exam = {kor
            , eng
            , math
            , total(){
                return this.kor+this.eng+this.math;
    }};
    

    console.log("#2 : ", exam.kor, ",", exam.eng, ",", exam.math, ",", exam.total());
}

// Advanced Json #1 variable
{
    let kor=30;
    let eng=40;
    let math=50;

    // let exam_old = {
    //     kor:kor,
    //     eng:eng,
    //     math:math
    // };

    let exam = {kor, eng, math};
    // console.log(exam_old.kor, ",", exam_old.eng);
    console.log("#1 : ", exam.kor, ",", exam.eng);
}