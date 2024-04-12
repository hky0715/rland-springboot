let exam = {kor:10, eng:20, math:30}; // 왕자님: target

console.log("target, kor:", exam.kor);

let logHandler = {
    get(target, prop, receiver) {
        console.log("헤헤헤헤");

        //return target[prop];
        //return Reflect.get(target, prop, receiver);
        return Reflect.get(...arguments);   // spread!
    }
};

//Proxy의 인자는 target, 그리고 처리기(handler)
// 사실 proxy는 kor값이 없는데!!!!!!! kor가 나오네?????
let proxy = new Proxy(exam, logHandler);
console.log("proxy, kor:", proxy.kor);