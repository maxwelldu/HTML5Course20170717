(function() {
  window.showProCount = showPro;

  function showPro() {
    var buyCar = document.querySelector('.buyCar');
    var oEm = buyCar.querySelector('em');

    // 获取购物车数据根据购物车中的data数组来判断商品个数
    myajax.get('http://h6.duchengjiu.top/shop/api_cart.php',
        {token: localStorage.token}, function(error, jsonData) {
          var json = JSON.parse(jsonData);
          var data = json.data;
          oEm.innerText = data.length;
        });
  }
})();