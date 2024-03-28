// WARNING: For GET requests, body is set to null by browsers.

// windows.onload = function () {
//   console.log("script");
// };
/*
window.addEventListener("load", function () {
  console.log("script");
});
window.addEventListener("load", function () {
  console.log("script1");
});
*/

/*
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
*/
/*
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    // json으로 데이터를 던져주는 부분
    //console.log(this.responseText);
    var list = JSON.parse(this.responseText);
    alert(list[0].korName);
  }
});
*/

// 요러케 바꿔쓸 수도 있음! 이벤트리스너를 만들어서 callback function을 위임하거나, 아님 onload 변수에 callback function을 대치하거나!
// 로드될 때! 실행된다!
/*
xhr.onload = function () {
  var queryInput = document.getElementById("query-input");

  var list = JSON.parse(this.responseText);
  queryInput.value = list[0].korName;
  //alert(list[0].korName);
};

xhr.open("GET", "http://localhost:8080/api/menus?c=1&p=3");
xhr.send();
*/

function Cookie() {
  this.map = {};

  var cookieDecoded = decodeURIComponent(document.cookie);
  // 쿠키가 여러개일때, 구분자를 ';'로 나눈다고오오오
  var cookieTokens = cookieDecoded.split(";");

  for (c of cookieTokens) {
    var temp = c.split("=");
    var key = temp[0];
    var value = JSON.parse(temp[1]);

    this.map[key] = value;
  }
}

Cookie.prototype = {
  get: function (name) {
    return this.map[name];
  },
  save: function () {
    /* 초기화 후 map에 담긴 내용을 encoding해서 넣으면 save를 할 수 있다!
    cookie를 초기화 할 때는 path를 반드시 맞춰줘야 함*/

    var list = this.map["menus"];
    var size = list.length;
    var lastIndex = size - 1;

    var str = "[";

    //var list = this.map[value];
    for (var c of this.map["menus"]) {
      //str += c; // this.map에 있는 내용을 돌면서 넣어야 함......
      str += JSON.stringify(c);
      if (c !== list[lastIndex]) 
        str += ",";
    }
    
    str += "]";

    var encodedCookie = decodeURIComponent(str);
    //document.cookie = "menus=hehe; path=/;";
    document.cookie = `menus=${encodedCookie}; path=/;`;
  },
  add: function (name, value) {},

  // 객체를 배열에 넣는 것!
  addItem: function (name, item) {
    var list = this.map[name];
    list.push(item);
  },
  set: function (name, value) {},
  remove: function (name) {},
};

window.addEventListener("load", function () {
  // 버튼에 바로 id를 부여하지 않는다. id는 남발하지 말아야 함. id는 section(영역)에나 부여하는 것..!
  // 영역 안의 다른 태그를 찾는 방법을 알아야 함

  // var val = decodeURIComponent(document.cookie.split("=")[1]);

  var cookie = new Cookie();
  //console.log("헤헤헤헤헤", cookie.get("menus"));

  var queryForm = this.document.getElementById("query-form");
  var queryButton = queryForm.getElementsByClassName("icon-find")[0];
  var queryInput = queryForm.getElementsByClassName("query-input")[0];

  var categoryFilter = this.document.querySelector(".category-filter");
  //var li1 = categoryFilter.querySelector("ul>li:nth-child(2)");

  var menuCardList = this.document.getElementById("menu-card-list");
  var menuContent = menuCardList.getElementsByClassName("content")[0];

  menuContent.onclick = function (e) {
    if (!e.target.classList.contains("btn-cart")) return;

    //alert("haha");

    var item = {};
    item.id = e.target.dataset.id;
    item.korName = e.target.dataset.korname;
    item.engName = e.target.dataset.engname;
    item.price = e.target.dataset.price;
    item.regDate = e.target.dataset.regdate;
    item.img = e.target.dataset.img;
    item.categoryId = e.target.dataset.categoryid;

    e.preventDefault();

    cookie.addItem("menus", item);
    cookie.save();

    console.log(cookie);
  };

  // var payBlock = document.querySelector(".pay-block");

  // payBlock.onclick = function (e) {
  //   if (e.target.tagName != "BUTTON") {
  //     return;
  //   }

  //   e.preventDefault();
  //   alert("담기");
  // };

  categoryFilter.onclick = function (e) {
    // target = 이벤트가 발생한 타겟!
    if (e.target.tagName != "A") {
      return;
    }

    e.preventDefault();

    var categoryId = e.target.dataset.id;

    var url = `http://localhost:8080/api/menus?c=${categoryId}`;

    request(url, function (list) {
      bind(list);
      console.log("카테고리 검색 완료!");
    });
  };

  queryButton.onclick = function (e) {
    // 기본행위를 막자! 그럼 페이지 새로고침이 안된당
    e.preventDefault();

    var q = queryInput.value;

    var url = `http://localhost:8080/api/menus?q=${q}&p=1`;

    request(url, function (list) {
      bind(list);
      console.log("검색어 목록 reload");
    });
  };

  function request(url, callback, method) {
    method = method || "GET"; // undefined일때 GET!

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    /* 
    로드된 다음에 실행할 부분의 로직이 각각 다를수도 있으니까.. 
    callback함수를 맹글어...
    */
    xhr.onload = function () {
      var list = JSON.parse(this.responseText);
      //bind(list);
      callback(list);
    };

    xhr.open(method, url);
    xhr.send();
  }

  function bind(list) {
    // 해당 컨텐츠가 사용중인 class들의 목록. 동적으로 class를 추가할 수 있음
    menuContent.classList.add("fade-out");
    console.log("fade-out 시작!");

    // fade-out을 일정 시간 뒤에 거두거나, fade-out이 완료될 때 거두거나!
    // window객체. 알람시계 같이 알람 call!
    //setTimeout(function () {
    menuContent.ontransitionend = function () {
      menuContent.innerHTML = "";
      console.log("fade-out 종료!");

      // fade-out 두번 실행돼서.. 두번 실행되는것을 막기 위해 function이 대치되어 있던 것을 null로 변경
      menuContent.ontransitionend = null;

      for (var menu of list) {
        // list.forEach(menu=> {
        // var menu = list[0];
        var sectionHTML = `<section class="menu-card">
    <h1>
      <a class="heading-3" href="detail.html?id=1"> ${menu.korName} </a>
    </h1>
    <h2 class="heading-2 font-weight:normal color:base-5"> ${menu.engName}</h2>
    <div class="price-block d:flex align-items:flex-end">
      <span class="font-weight:bold">${menu.price}</span>원
      <span class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span>
    </div>
    <div class="img-block">
      <a href="detail.html?id=1"><img src="/image/menu/8.jpg"/></a>
    </div>
    <div class="like-block d:flex justify-content:flex-end">
      <a class="icon icon-heart icon-color:base-4" href="">좋아요</a>
      <span class="font-weight:bold ml:1">2</span>
    </div>
    <div class="pay-block d:flex">
      <form action="/cart/add-menu" method="post">
        <input type="hidden" name="id" />
        <button
          class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text"
        >      담기</button>
      </form>
      <a
        class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text"
        href="">주문하기</a>
    </div>
  </section>`;

        menuContent.insertAdjacentHTML("afterbegin", sectionHTML);
        // });
      }

      menuContent.classList.remove("fade-out");
      //}, 3000);
    };

    // 왜 지워지기 전에 깜빡하쥐?? 이것때문이지.....
  }
});
