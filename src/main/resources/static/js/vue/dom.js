window.addEventListener("load", ()=>{

    // DOM 객체 만들기
    const section = document.querySelector("#form-section");
    const xInput = section.querySelector("input[name='x']");
    const yInput = section.querySelector("input[name='y']");
    const initSubmit = section.querySelector("input[value='초기화']");
    const calcSubmit = section.querySelector("input[value='계산하기']");
    const resultSpan = section.querySelector(".result-span");

    console.log(resultSpan);
    
    let x = 3;
    let y = 4;

    xInput.value = x;
    yInput.value = y;

    calcSubmit.onclick = (e)=>{
        e.preventDefault();
        let x = Number(xInput.value);
        let y = Number(yInput.value);

        let sum = x+y;
        console.log(sum);
        
        // span은 value가 없음ㅠㅠ value는 input만 갖고있슈
        resultSpan.textContent = sum;
        // resultSpan.append = sum;
        // resultSpan.innerText = sum;
    }

})

