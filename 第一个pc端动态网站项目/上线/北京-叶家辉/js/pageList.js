(function(){
  if(localStorage.cat_id) {
    var cat_id = localStorage.cat_id;
    var oMainProList = document.querySelector('.mainProList');
    var pageList = document.querySelector('#pageList');
    var allPageListLi = pageList.querySelectorAll('li');
    var iNow = 0;            // 存储当前的索引号
    var iNowVal = 1;          // 当前所引号下对应的值
    var arrIndex = [1, 2, 3, 11, 12, 13];        // 存储当前的六位数字，用于显示在li上

    pageList.addEventListener('click', function(event) {
      event = event || window.event;
      var target = event.target || event.srcElement;
      var targetVal = target.innerText;

      // 如果点击的是li
      if (!isNaN(targetVal)) {
        iNowVal = parseInt(targetVal);
        myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
            {cat_id, page: iNowVal, pagesize: 12},
            function(error, jsonData) {
              bindDom(jsonData);
              changeIndex();
            }
        );
      }

      // 如果点击的是上下页
      // 如果点击上一页
      if (targetVal === "上一页") {
        iNowVal--;
        if (!Boolean(arrIndex.indexOf(iNowVal))) {   // 如果当前数组中含有计算后的值
          iNow = arrIndex.indexOf(iNowVal);
          changeClass(allPageListLi, iNow, 'current');
        } else {
          if (iNowVal === 0) {
            iNowVal = 1;
          }
          changeIndex();
        }

        myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
            {cat_id, page: iNowVal, pagesize: 12},
            function(error, jsonData) {
              bindDom(jsonData);
              changeIndex();
            }
        );
      }

      if (targetVal === "下一页") {
        iNowVal++;
        if (arrIndex.indexOf(iNowVal) === -1) {   // 如果当前数组中不含有计算后的值
          changeIndex();
        } else {
          iNow = arrIndex.indexOf(iNowVal);
          changeClass(allPageListLi, iNow, 'current');
        }
        myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
            {cat_id, page: iNowVal, pagesize: 12},
            function(error, jsonData) {
              bindDom(jsonData);
            }
        );
      }

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
          oMainProList.innerHTML = `<p><a href="./index.html">商品数据为空,点击此处返回首页</a></p>`;
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
    }, false);
  }
})()