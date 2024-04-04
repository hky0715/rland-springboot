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

    // 배열을 알아서 펼쳐서 계산해줘! spread해주라!
    let kors = [20, 40, 20];
    console.log("sum spread by myself : ", sum(kors[0], kors[1], kors[2]));
    console.log("sum spread auto : ", sum(...kors));
    

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