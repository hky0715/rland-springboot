// WARNING: For GET requests, body is set to null by browsers.

//함수추가
// xhr.addEventListener("readystatechange", function() {
//   if(this.readyState === 4) {
//     var list = JSON.parse(this.responseText);
//     console.log(list);
//     alert(list[0].korName);
//   }
// });

//es6 이전 콜백 방식
// window.onload = function(){
//     console.log("시작갈겨");
// }
// console.log("에ㅔ엥");

//load 이벤트에 여러 함수를 추가하는 경우 (유용!)
//다른사람이 load 이벤트 사용할 수도 있으니까 덮어쓰면안돼
//습관적으로 add를 쓰도록

function Cookie(){
    this.map={};
    var cookieDecoded = decodeURIComponent(document.cookie);
    var cookieTokens = cookieDecoded.split("; ");

    for(c of cookieTokens){
        var temp = c.split("=");
        var key = temp[0];
        var value = JSON.parse(temp[1]);
        this.map[key] = value;
    }
}

Cookie.prototype = {
    get:function(name){
        return this.map[name];
    },
    save:function(){
         
        var list = this.map["menus"];
        var size = list.length;
        var lastIndex = size-1;

        str ="[";

        for(var m of this.map["menus"]){
            str+=JSON.stringify(m);
            if(m!==list[lastIndex])
                str+=",";
        }
              
        str +="]";

        var encoded = encodeURIComponent(str);
        document.cookie = `menus=${encoded}; path=/;`;

    },
    add:function(name, value){

    },
    addItem:function(name, item){
      var list = this.map[name];  
        list.push(item);
    },
    set:function(name, value){

    },
    remove:function(name){

    }
}

window.addEventListener("load", function(){


    var cookie = new Cookie();
    // console.log(cookie.get("menus"));
    // console.log(cookie.get("menusss"));

    // var val = decodeURIComponent(this.document.cookie.split("=")[1]);
    // console.log(JSON.parse(val));


    var categoryFilter = this.document.querySelector(".category-filter");
    var li1 = categoryFilter.querySelector("ul>li:nth-child(2)");

    var queryForm = this.document.getElementById("query-form");
    var queryButton = queryForm.getElementsByClassName("icon-find")[0];
    var q = queryForm.getElementsByClassName("q")[0];
    var menuSection = this.document.getElementById("menu-card-list");
    var menuContent = menuSection.getElementsByClassName("content")[0];
    
    menuContent.onclick = function(e){
        if(!e.target.classList.contains("btn-cart"))
            return;
        
        
        var item = {};
        
        item.id = e.target.dataset.id;
        item.korName = e.target.dataset.korname;
        item.engName = e.target.dataset.engname;
        item.price = e.target.dataset.price;
        item.regDate = e.target.dataset.regdate;
        item.img = e.target.dataset.img;
        item.categoryId = e.target.dataset.categoryid;
        
        e.preventDefault();
 

        cookie.addItem("menus",item);

        cookie.save();
        console.log(cookie);

    };



    // var menuCard = menuContent.getElementsByClassName("menu-card")[0];
    var cartButton = this.document.querySelectorAll(".menu-card .icon-cart");

    // console.log(cartButton);

    // [].forEach.call(cartButton, function(button){
    //     button.addEventListener("click", click, false);
    // });

    function click(e){
        e.preventDefault();
        alert("click");
    };

    // cartButton.onclick = function(e){
    //     e.preventDefault();

    //     alert("뚝딱~");

    //     var id = e.target.dataset.id;
    //     var url = `http://localhost:8080/cart/add-menu`;
    //     var method = "POST";

    //     console.log("갓니?");

    // }



    categoryFilter.onclick = function(e){

        // console.log(e.target);
        // console.log(e.target.tagName);

        if(e.target.tagName != "A")
            return;
        
        e.preventDefault();   
        // console.log(e.target.dataset.id);

        var id = e.target.dataset.id;
        var url = `http://localhost:8080/api/menus?q=${q.value}&c=${id}&p=1`;

        requestXHR(url, function(list){
            bind(list);
            console.log("검색목록 리로드");
        });
    };

    queryButton.onclick = function(e){

        e.preventDefault();                                

        var url = `http://localhost:8080/api/menus?q=${q.value}&p=1`;
        requestXHR(url, function(list){
            bind(list);
            console.log("검색목록 리로드");
        });

    }

    function requestXHR(url, callback, method){

        //method가 undefined인 경우 GET
        method = method || "GET";
            
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        //변수로 받기
        xhr.onload = function(){
            var list = JSON.parse(this.responseText);
            callback(list);
        };
        
        // xhr.open("GET", "http://localhost:8080/api/ \
        // menus?q="+q.value);

        xhr.open(method, url);
        xhr.send(); 
        
    };

    function bind(list){
        // var menu = list[0];

        menuContent.classList.add("fade-out");
        menuContent.ontransitionend = function(){

            menuContent.classList.remove("fade-out");
            menuContent.innerHTML='';
            
            menuContent.ontransitionend = null;

            list.forEach(menu => {
                
                var sectionHTML = `
                <section class="menu-card">
                                <h1>
                                    <a class="heading-3">${menu.korName}</a></h1>
                                <h2 class="heading-2 font-weight:normal color:base-5" >Cafe Latte</h2>
                                <div class="price-block d:flex align-items:flex-end"><span class="font-weight:bold" >${menu.price}</span>원<span class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span></div>
                                <div class="img-block">
                                <a href="detail?id=${menu.id}"><img src="/image/menu/8.jpg"></a>
                                </div>
                                <div class="like-block d:flex justify-content:flex-end">
                                    <a class="icon icon-heart icon-color:base-4" href="">좋아요</a>
                                    <span class="font-weight:bold ml:1">2</span>
                                </div>
                                <div class="pay-block d:flex">
                                    <!-- <a class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text" href="">담기</a> -->
                                    <form action="/cart/add-menu" method="post" style="display: contents;">
                                        <input type="hidden" name="id">
                                        <button class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text">담기</button>
                                    </form>
                                    <a class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text" href="">주문하기</a>
                                </div>
                            </section>
                `;
                menuContent.insertAdjacentHTML("beforeend", sectionHTML);
            });
        };
    };
});


// function category(c){
    //     console.log(c);
    //     var menuSection = this.document.getElementById("menu-card-list");
    //     var menuContent = menuSection.getElementsByClassName("content")[0];
    //     var queryForm = this.document.getElementById("query-form");
    //     var q = queryForm.getElementsByClassName("q")[0];
        
    //     var xhr = new XMLHttpRequest();
    //     xhr.withCredentials = true;
    
    //         //변수로 받기
    //         xhr.onload = function(){
    //         var list = JSON.parse(this.responseText);
    //         // var menu = list[0];
            
    //         menuContent.innerHTML='';
    
    //         list.forEach(menu => {
                
    //             var sectionHTML = `
    //             <section class="menu-card">
    //                             <h1>
    //                                 <a class="heading-3">${menu.korName}</a></h1>
    //                             <h2 class="heading-2 font-weight:normal color:base-5" >Cafe Latte</h2>
    //                             <div class="price-block d:flex align-items:flex-end"><span class="font-weight:bold" >${menu.price}</span>원<span class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span></div>
    //                             <div class="img-block">
    //                                 <a><img src="/image/menu/8.jpg"></a>
    //                             </div>
    //                             <div class="like-block d:flex justify-content:flex-end">
    //                                 <a class="icon icon-heart icon-color:base-4" href="">좋아요</a>
    //                                 <span class="font-weight:bold ml:1">2</span>
    //                             </div>
    //                             <div class="pay-block d:flex">
    //                                 <!-- <a class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text" href="">담기</a> -->
    //                                 <form action="/cart/add-menu" method="post" style="display: contents;">
    //                                     <input type="hidden" name="id">
    //                                     <button class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text">담기</button>
    //                                 </form>
    //                                 <a class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text" href="">주문하기</a>
    //                             </div>
    //                         </section>
    //             `;
    //             menuContent.insertAdjacentHTML("beforeend", sectionHTML);
    //         });
    //     };
        
    
    //     xhr.open("GET", `http://localhost:8080/api/menus?q=${q.value}&c=${c}&p=1`);
    //     xhr.send(); 
    // }