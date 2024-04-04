function InputFileList(input){
    this.input = input;
    this.dt = new DataTransfer();
};

InputFileList.prototype = {
    add:function(file){
        console.log("this.input.files = ",this.input.files);


        for(var inputFile of this.input.files){
            this.dt.items.add(inputFile);
            console.log("파일리스트 for문 도는 동안 = ",inputFile);
        }
            
        this.dt.items.add(file);

        this.input.files = this.dt.files;              
    }
};


window.addEventListener("load", function () {

    // img input이 있는 section의 id를 먼저 얻어오기
    //var regForm = this.document.getElementById("reg-form");
    var regForm = this.document.querySelector("#reg-form");
    var imgInput = regForm.querySelector(".img-input");
    var previewPanel = regForm.querySelector(".preview-panel");
    var imgLabel = regForm.querySelector(".img-label");

    // 전역변수로 생성
    var inputFileList = new InputFileList(imgInput);

    imgLabel.ondrop= function(e){

        e.stopPropagation();
        e.preventDefault();
  
        var file = e.dataTransfer.files[0];
  
      //   console.log("데이터 트랜스퍼 몇개 담겻는가 = ",e.dataTransfer.files);
  
        // 생성한 후에 file add 하고 출력
        inputFileList.add(file);
      //   console.log(file);
  
        if(file.type.indexOf("image/") != 0){
            alert("이미지만 첨부 가능합니다.");
            return;
        };
  
        if(file.size > 1000*1024){
            alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
            return;
        };
  
        var reader = new FileReader();
        
        reader.onload = function(e){
            // console.log(e.target.result);
            var img = document.createElement("img");
            img.src=e.target.result;
            
            previewPanel.append(img);
  
            //렌더리이이이잉~~~~
            setTimeout( ()=> {
                img.classList.add("slide-in");
                //10밀리세컨
            }, 10);
           
        };
  
        // dataTransfer.items.add(file);
        reader.readAsDataURL(file);
        
        // imgInput.files = dataTransfer.files;
  
        console.log("imgInput 온드랍 = ",imgInput.files);
        
    };

    imgLabel.ondragover = function(e){
        e.stopPropagation();
        e.preventDefault();

        var valid = e.dataTransfer &&
                    e.dataTransfer.types &&
                    e.dataTransfer.types.indexOf("Files") >=0;

        if(valid)
            imgLabel.classList.add("valid");
        else
            imgLabel.classList.add("invalid");

    };

    // input event! e는 입력이 완료되었을 때!
    imgInput.oninput = function(e) {
        // 첫번째로 넣은 파일? -> imgInput.files[0] 
        // 파일의 어떤 속성을 사용할 수 있는지 확인해보기
        for (k in imgInput.files[0])
            console.log(k,":",imgInput.files[0][k]);

        var file = imgInput.files[0];
        //var files = imgInput.files;

        if (file.type.indexOf("image/") != 0) {// file type 제약
            alert("이미지 파일만 업로드 할 수 있습니다.");
            return ;
        }

        if (file.size > 100*1024) {// file size 제약
            alert("100kB보다 크기가 작은 파일만 업로드 할 수 있습니다.");
            return ;
        }

        // 입력상자에 있는 파일을 읽어들이는 것
        var reader = new FileReader();
        reader.onload = function(e) {
          //  for (k in files) {
                // image 객체를 만들어서~ 읽어들인 경로를 img 객체의 src로 넣어줌
                var img = document.createElement("img");
                img.src = e.target.result;

                //previewPanel.appendChild();     // node가 가진 기능
                previewPanel.append(img);          // element가 가진 기능

                // 사진 나올때 효과 주기, 렌더링
                /*
                setTimeout(()=>{
                    //img.classList.add("fade-in");
                    img.classList.add("slide-in");  
                }, 10);
                */
            //}
        }
        reader.readAsDataURL(file);

        console.log("Hello!");
    };
});