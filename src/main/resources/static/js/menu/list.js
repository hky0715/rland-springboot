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
window.addEventListener("load", function () {
  // 버튼에 바로 id를 부여하지 않는다. id는 남발하지 말아야 함. id는 section(영역)에나 부여하는 것..!
  // 영역 안의 다른 태그를 찾는 방법을 알아야 함
  var queryForm = this.document.getElementById("query-form");
  var queryButton = queryForm.getElementsByClassName("icon-find")[0];
  var queryInput = queryForm.getElementsByClassName("query-input")[0];

  var menuCardList = this.document.getElementById("menu-card-list");
  var menuContent = menuCardList.getElementsByClassName("content")[0];

  queryButton.onclick = function (e) {
    // 기본행위를 막자! 그럼 페이지 새로고침이 안된당
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // 요청한 데이터가 도착해서 객체로 만들어졌을때~
    xhr.onload = function () {
      //var queryInput = document.getElementById("query-input");

      var list = JSON.parse(this.responseText);
      //queryInput.value = list[0].korName;
      //alert(list[0].korName);

      // 데이터를 낑겨주는 작업
      /*
      var h1Text = document.createTextNode(list[0].korName);
      var menuSection = document.createElement("section");
      menuSection.className = "menu-card";
      var h1 = document.createElement("h1");
      h1.appendChild(h1Text);
      menuSection.appendChild(h1);

      menuContent.appendChild(menuSection);
      */

      var menu = list[0];

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
    };

    var q = queryInput.value;

    /*
    xhr.open("GET", "http://localhost:8080/api/" + "menus?q=" + q + "&p=1");
    xhr.open("GET", "http://localhost:8080/api/ \
      menus?q="+ q +"&p=1");
    */

    xhr.open("GET", `http://localhost:8080/api/menus?q=${q}&p=1`); // ES6 template, backtick
    xhr.send();
  };
});
