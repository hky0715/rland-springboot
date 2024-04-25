// 주 업무를 맡고 있는 놈들은 class로 만들어서 지역화 하고..?
class Main extends React.Component {

    render() {
        return <>
            <section className="menu-list">
            <h1 className="d:none">메뉴 검색 목록</h1>
            <div>
                <section className="menu-filter">
                    <h1>Rland Menu<span className="d:none">검색</span></h1>
            
                    <nav className="category-filter">              
                        
                        <h1 className="d:none">카테고리 검색 메뉴 목록</h1>
                        <ul>
                            <li><a className="sm:deco md:deco sm:icon-filter_list"                                    
                                    href="list">전체메뉴</a></li>
                            <li>
                                <a className="d:none md:d:inline current" 
                                href="?c=1">커피</a></li>
                        </ul>
                    </nav>
                    <section className="query-filter" id="query-form">
                        <h1 className="d:none">이름 검색 폼</h1>
                        <form action="list" method="get">
                            <fieldset>
                                <legend className="d:none">이름 검색</legend>
                                <input className="query-input" type="text" placeholder="메뉴 검색" name="q"/>
                                <button className="icon icon-find">검색</button>
                            </fieldset>
                        </form>
                    </section>
                </section>

                {/* <!-- ------------------------------------------------------ --> */}

                <section className="menu-card-list" id="menu-card-list">
                    <h1 className="d:none">메뉴 목록</h1>
                    <div className="content fade">
                        <section className="menu-card">
                            <h1>
                                <a className="heading-3" href="detail.html">카페라떼1</a></h1>
                            <h2 className="heading-2 font-weight:normal color:base-5">Cafe Latte</h2>
                            <div className="price-block d:flex align-items:flex-end"><span className="font-weight:bold">4,500</span>원<span className="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span></div>
                            <div className="img-block">
                                <a href="detail.html?id=1">
                                    <img src="/image/menu/8.jpg" />                                      
                                </a>
                            </div>
                            <div className="like-block d:flex justify-content:flex-end">
                                <a className="icon icon-heart icon-color:base-4">좋아요</a>
                                <span className="font-weight:bold ml:1">2</span>                                
                            </div>
                            <div>
                                <button>삭제</button>
                            </div>
                            <div className="pay-block d:flex">
                                {/* <!-- <a className="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text" href="">담기</a> --> */}
                                <form action="/cart/add-menu" method="post">
                                    <input type="hidden" name="id"/>
                                    
                                    <button                                                                             
                                        className="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text">
                                        담기
                                    </button>
                                </form>
                                <a className="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text">주문하기</a>
                            </div>
                        </section>                        
                    </div>
                </section>
            </div>
        </section>

        <section className="mb:5">
            <h1 className="d:none">페이저</h1>
            <div>0</div>
            <div>0</div>
            <ul className="n-pager" style={{display:"flex", "justify-content": "center"}}>
                
                <li>
                    <span>이전</span>
                    <a href="list?p=1">이전</a>
                </li>
                
                <li>
                    <span>1</span>

                    <a href="list?p=1">1</a>
                </li>
                
                <li>
                    <span >다음</span>
                    <a href="list?p=12">다음</a>
                </li>
            </ul>
        </section>
        <section className="basket-status">
            <h1 className="d:none">Basket Bar</h1>
            <dl className="ph:3">
                <dt>금액</dt>
                <dd className="ml:2">5,000원</dd>
                <dt className="d:none">수량</dt>
                <dd className="ml:auto">
                    <a href="/basket/list" 
                        className="icon icon-basket_outline icon-color:base-0 icon-size:4 icon-text-with"
                    >1</a>
                </dd>
            </dl>
        </section>
        </>
    }
}


ReactDOM.render( 
    <Main/> , 
    document.querySelector("#main")
)

//rendering을 쉽게 해주는 component기반! 화면을 원하는대로 조각조각 따따따 조립하고 따따따
// function HoHo() {
//     let title = "hohoho1111"
//     return <span>{title}</span>;
// }

// function HeHe() {
//     return <span>HeHe</span>;
// }

// ReactDOM.render(
//     <span><HoHo/><HeHe/></span>,
//     document.querySelector("#test")
// )