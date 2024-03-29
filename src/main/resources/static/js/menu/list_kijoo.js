function Cookie() {
    map = {};
    // this.map = {};

    console.log("docu cookie = " + document.cookie);
    console.log(";으로 나눈거 = " + document.cookie.split(";"));

    var cookieDecoded = decodeURIComponent(document.cookie);
    var cookieTokens = cookieDecoded.split(";");

    for (var c of cookieTokens) {
        var tmp = c.split("=");
        var key = tmp[0];
        var value = JSON.parse(tmp[1]);

        map[key] = value;
        // this.map[key] = value;
    }
}

Cookie.prototype = {
    get: function (name) {
        // return this.map[name];
        return map[name];
    },

    save: function () {
        // document.cookie = "쿠키지움";
        // document.cookie = "menus=hehe; Max-Age=0; path=/;"
        // document.cookie = "menus=?; path=/;"

        //New Lecture
        // var list = this.map["menus"];
        var list = map["menus"];
        var size = list.length;
        var lastIndex = size-1;

        var str = "[";
        // for(var m of this.map["menus"]){
        for(var m of map["menus"]){
            // str += `${key}=${JSON.stringify(value)};`;
            str += JSON.stringify(m); // this.map loop -> {id:...}
            // if(m === this.map["menus"][this.map["menus"].length-1]) // 마지막 항목이 아니면
            if(m !== list[lastIndex]) // 마지막 항목이 아니면
                str += ","
        }
        str += "]";


        var encoded = encodeURIComponent(str);
        document.cookie = `menus=${encoded}; path=/;`

    },
    remove: function (name) {

    },
    add: function (name, value) {

    },
    addItem: function (name, item) {
        // var list = this.mapklj uktu lkj tmslekzdlja [name];
        var list = map[name];
        list.push(item);
    },
    set: function (name, value) {

    },

};


window.addEventListener("load", function () {

    var cookie = new Cookie();
    console.log(cookie.get("menus"));


    var categoryFilter = this.document.querySelector(".category-filter");
    // var li1 = categoryFilter.querySelector("ul>li:nth-child(2)");
    // var a = categoryFilter.querySelector("ul>li:nth-child(2)>a");

    var queryForm = this.document.getElementById("query-form");
    var queryButton = queryForm.getElementsByClassName("icon-find")[0];
    var queryInput = queryForm.getElementsByClassName("query-input")[0];

    var menuCardList = document.getElementById("menu-card-list");
    var menuContent = menuCardList.getElementsByClassName("content")[0];

    // 쿠키누름
    menuContent.onclick = function (e) {

        if (!e.target.classList.contains("btn-cart"))
            return;

        // e.preventDefault();

        // console.log(e.target.dataset.id);
        // console.log(e.target.dataset.korname);
        // console.log(e.target.dataset.engname);
        // console.log(e.target.dataset.price);
        // console.log(e.target.dataset.regdate);
        // console.log(e.target.dataset.img);
        // console.log(e.target.dataset.categoryid);

        var item = {};
        item.id = e.target.dataset.id;
        item.korName = e.target.dataset.korname;
        item.engName = e.target.dataset.engname;
        item.price = e.target.dataset.price;
        item.regdate = e.target.dataset.regdate;
        item.img = e.target.dataset.img;
        item.categoryId = e.target.dataset.categoryid;

        cookie.addItem("menus", item);

        // console.log("cookie.get = " + cookie.get("menus"));

        // cookie.remove("menus");
        // cookie.add("new cookie name", ?);
        // cookie.set("menus", ?);
        //
        // cookie.save();

        // alert("담기누름");

        cookie.save();
    };

    categoryFilter.onclick = function (e) {

        e.preventDefault();

        if (e.target.tagName != "A") {
            return;
        }

        var c = e.target.dataset.id;

        console.log("c = ", c);

        var method = "GET";
        var url = `http://localhost:80/api/menus?c=${c}`;

        request(url, function (list) {
            bind(list);
            console.log("카테고리 검색 종료");
        });
    };

    queryButton.onclick = function (e) {

        e.preventDefault();

        var q = queryInput.value;
        // var method = "GET";
        var url = `http://localhost:80/api/menus?q=${q}&p=1`;

        request(url, function (list) {
            bind(list);
            console.log("검색어 목록 재로드");
        });
    };


    function request(url, callback, method) {

        method = method || "GET";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.onload = function () {
            var list = JSON.parse(this.responseText);
            callback(list);
            // bind(list);
        };

        xhr.open(method, url);
        xhr.send();
    }

    function bind(list) {
        // tag의 class를 list로 가지고 있는 함수
        // menuContent.classList
        menuContent.classList.add("fade-out");
        console.log("fade-out 시작");

        menuContent.ontransitionend = function () {
            console.log("fade-out 종료");
            menuContent.ontransitionend = null;
            menuContent.classList.remove("fade-out");
            menuContent.innerHTML = "";

            for (var menu of list) {

                var sectionHTML = `
                    <section class="menu-card">
                        <h1>
                            <a class="heading-3">${menu.korName}</a>
                        </h1>
                        <h2 class="heading-2 font-weight:normal color:base-5">${menu.engName}</h2>
                        <div class="price-block d:flex align-items:flex-end">
                            <spanclass="font-weight:bold">${menu.price}</span>원
                                <span class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span></div>
                        <div class="img-block">
                            <a href="detail.html?id=1"><img src="/image/menu/8.jpg"></a>
                        </div>
                        <div class="like-block d:flex justify-content:flex-end">
                            <a class="icon icon-heart-fill icon-color:base-4" href="">좋아요</a>
                            <span class="font-weight:bold ml:1" >2</span>
                        </div>
                        <form  class="pay-block d:flex" action="/cart/add-menu" method="post">
                            <input type="hidden" name="id">
                            <button class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text">담기</button>
                            <button class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text"> 주문하기</button>
                        </form>
                    </section>`;

                menuContent.insertAdjacentHTML("beforeend", sectionHTML);
            }
        };


    }

});