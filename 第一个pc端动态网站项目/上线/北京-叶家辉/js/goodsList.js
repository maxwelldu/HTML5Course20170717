(function() {
  var oProList = document.querySelector('#proList');
  var oMainProList = document.querySelector('.mainProList');
  var allNavLi = oProList.querySelectorAll('#proList>li');

  myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {},
      function(error, responseText) {

        var json = JSON.parse(responseText);
        var data = json.data;
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];

          allNavLi[i].dataset.index = i;
          allNavLi[i].querySelector('a').href="goodsList.html?cat_id=" + obj['cat_id'];
          allNavLi[i].querySelector('a').innerText= obj['cat_name'];
       //   oProList.innerHTML += ` <li class="proListItem" data-index=${i}>
       //<a href="goodsList.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`;

          // 这里将主导航条的数据存储到localStorage中


        }
        var navLi = document.querySelector('#proList').querySelectorAll('li');
        changeClass(navLi, localStorage.currentNav, 'current');
      });

  var cat_id = matchQueryString('cat_id');
  localStorage.cat_id = cat_id;
  if(cat_id){
    myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
        {cat_id, 'pagesize': 12}, function(error, responseText) {
          var allLi = oMainProList.querySelectorAll('li');       // 获取所有的li
          var json = JSON.parse(responseText);
          var data = json.data;
          for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            // 添加数据
            allLi[i].querySelector('a').href = 'goodsDetail.html?goods_id=' +
                obj['goods_id'];
            allLi[i].querySelector('img').src = obj['goods_thumb'];
            allLi[i].querySelector('h3').title = obj['goods_name'];
            allLi[i].querySelector('h3').innerText = obj['goods_name'];
            allLi[i].querySelector('p').innerText = obj['goods_desc'];
            allLi[i].querySelector('span').innerHTML = '<i>&yen;</i>' +
                obj['price'];
          }

          if (data.length === 0) {
            oMainProList.innerHTML = '';
          }
        });
  }

  //		hanlun
  var oGoodsSearch = document.querySelector('input[name=search_text]');
  var oGoodsSearch0 = document.querySelector('input[name=search_text1]');
  var oSearchDiv = document.querySelector('.search-history');
  var oSearchUlHistory = document.querySelector('#searchulhistory');
  var lock = true;

  //搜索的搜索框
  oGoodsSearch.onkeyup = function(event) {
    event = event || window.event;
    event.preventDefault();
    if(localStorage.value){
      var str = localStorage.value.split('&');
      console.log(str);
    }
    if (event.keyCode === 13) {
      if (!localStorage.value) {
        localStorage.value = this.value;
      }else{
        localStorage.value += '&' + this.value;
      }
      location.href='goodsSearch.html?search_text='+this.value;
    }

    if (localStorage.value !== ''){
      if (!lock) return;
      lock = false;
      setTimeout(function(){
        lock = true;
      }, 10000);
      for (var i=0;i<str.length;i++) {
        var oLiSearch = document.createElement('li');
        oLiSearch.innerText = str[i];
        oSearchUlHistory.insertBefore(oLiSearch,oSearchUlHistory.children[0]);
      }
    }
  }
  if(localStorage.value){
    var str = localStorage.value.split('&');
    console.log(str);
    oGoodsSearch.value = str[str.length-1];
  }
  oGoodsSearch.onkeydown= function(){
    if (localStorage.value) {
      oSearchDiv.style.display = 'block';
    }
  }
  oGoodsSearch.onblur = function(){
    oSearchDiv.style.display = 'none';
  }

  //吸顶的搜索框
  var oGoodsSearch1 = document.querySelector('input[name=searchBtn]');
  var oGoodsSearch2 = document.querySelector('input[name=searchBtn1]');
  //搜索的按钮
  oGoodsSearch1.onclick = function(event) {
    event = event || window.event;
    event.preventDefault();
    if (!localStorage.value) {
      localStorage.value = oGoodsSearch.value;
    }else{
      localStorage.value += '&' + oGoodsSearch.value;
    }
    location.href='goodsSearch.html?search_text=' + oGoodsSearch.value;
  }
  //吸顶搜索的按钮

  var search_text = matchQueryString('search_text');
  myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',{
    search_text,pagesize:12
  },function(error,responseText){
    var json = JSON.parse(responseText);
    var data = json.data;
    //oMainProList.innerHTML = "";
    for (var i=0;i<data.length;i++) {
      var obj = data[i];
      oMainProList.innerHTML += `<li class="mainProListItem">
            <a href="goodsDetail.html?goods_id=${obj.goods_id}">
              <div class="ProListImg">
                <img src="${obj.goods_thumb}"/>
                <div class="mark"></div>
              </div>
              <div class="ProListInfor">
                <h3 class="ProName" title="仅重600g便携蓝牙音箱 丹麦设计 专业级音质 防滑防水 长续航">${obj.goods_name}</h3>
                <p class="des">${obj.goods_desc}</p>
                <span class="price"><i>&yen;</i>${obj.price}</span>
              </div>
            </a>
          </li>
          `;
    }
  });


  // 分页的Ajax
  function bindDom(jsonData) {
    // 和上面的获取数据后的操作是一样的，这里可以封装成一个方法
    var allLi = oMainProList.querySelectorAll('li');       // 获取所有的li
    var json = JSON.parse(jsonData);

    var data = json.data;
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];

      allLi[i].querySelector('a').href = 'goodsDetail.html?goods_id=' +
          obj['goods_id'];
      allLi[i].querySelector('img').src = obj['goods_thumb'];
      allLi[i].querySelector('h3').title = obj['goods_name'];
      allLi[i].querySelector('h3').innerText = obj['goods_name'];
      allLi[i].querySelector('p').innerText = obj['goods_desc'];
      allLi[i].querySelector('span').innerHTML = '<i>&yen;</i>' +
          obj['price'];
    }

    if (data.length === 0) {
    	console.log(location.href); 
      oMainProList.innerHTML = `<p><a href="index.html">商品数据为空,点击此处返回首页</a></p>`;
    }

    animate(document, {scrollTop: 0}, 600, 'Quad.easeOut');
  }

  function changeIndex() {
    // 更改arrIndex中的值
    iNow = 0;
    for (var i = 0; i < arrIndex.length; i++) {
      arrIndex[i] = iNowVal;
      if (i == 2) {
        iNowVal += 6;
        continue;
      }
      iNowVal++;
    }

    // 将arrIndex中的值重新赋值给li
    for (var i = 0; i < arrIndex.length; i++) {
      allPageListLi[i].innerText = arrIndex[i];
    }

    // 执行完后记得给iNowVal重新赋值
    iNowVal = arrIndex[iNow];
    changeClass(allPageListLi, iNow, 'current');
  }

			// 显示商品数量
  showProCount();
})();
