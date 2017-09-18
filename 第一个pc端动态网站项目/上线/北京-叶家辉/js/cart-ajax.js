(function(){
  var oProList=document.querySelector("#proList");

  myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function (error,responseText) {
    var json=JSON.parse(responseText);
    console.log(json);
    var data=json.data;
    for(var i=0;i<data.length;i++){
      var obj=data[i];
      oProList.innerHTML+=`<li class="proListItem" data-index="0"><a href="goodsList.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`;
    }
  });

})();