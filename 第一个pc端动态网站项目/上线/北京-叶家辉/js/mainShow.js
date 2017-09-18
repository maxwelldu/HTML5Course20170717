(function () {
    var mainContent = document.querySelector("#mainContent");
   // menWear热门
    var oMenWear=document.querySelector(".menWear").querySelector(".proContain").querySelector("ul");
    var oHomeFurnishing=document.querySelector(".homeFurnishing").querySelector(".proContain").querySelector("ul");
    var oFurniture=document.querySelector(".furniture").querySelector(".proContain").querySelector("ul");
    var oStationery=document.querySelector(".Stationery").querySelector(".proContain").querySelector("ul");
    var oDigital=document.querySelector(".Digital").querySelector(".proContain").querySelector("ul");
    var oFun=document.querySelector(".Fun").querySelector(".proContain").querySelector("ul");
    var oKitchen=document.querySelector(".Kitchen").querySelector(".proContain").querySelector("ul");
    var oFood=document.querySelector(".food").querySelector(".proContain").querySelector("ul");
    var ochildWear=document.querySelector(".girlWear").querySelector(".proContain").querySelector("ul");
    var oHot=document.querySelector(".menWear").querySelector(".proContain").querySelector("ul");


     window.onscroll=function () {
         var windowHeight=document.body.scrollTop||document.documentElement.scrollTop;

         if(windowHeight>getAllTop(oHot) - 900){
           throttleFun(addProList,30,{targetDom : oMenWear,cat_id:null,size:8});
         }
         if(windowHeight>getAllTop(oHot)) {

           // 这里加延时器的目的主要是为了：减少请求的次数
           throttleFun(addProList,30,{targetDom : oHomeFurnishing,id:45,size:8});
        }
        if(windowHeight>getAllTop(oHomeFurnishing)){
          throttleFun(addProList,30,{targetDom : oFurniture,id:55,size:8});
        }
        if(windowHeight>getAllTop(oFurniture)){
          throttleFun(addProList,30,{targetDom : oStationery,id:62,size:8});
        }
        if(windowHeight>getAllTop(oStationery)){
          throttleFun(addProList,30,{targetDom : oDigital,id:69,size:8});
        }
        if(windowHeight>getAllTop(oDigital)){
          throttleFun(addProList,30,{targetDom : oFun,id:77,size:8});
        }
        if(windowHeight>getAllTop(oFun)){
          throttleFun(addProList,30,{targetDom : oKitchen,id:82,size:8});
        }
        if(windowHeight>getAllTop(oKitchen)){
          throttleFun(addProList,30,{targetDom : oFood,id:92,size:8});
        }
        if(windowHeight>getAllTop(oFood)){
          throttleFun(addProList,30,{targetDom : ochildWear,id:125,size:8});
        }
     }

     // 判断当前dom元素是否不含子元素
     function isEmpty(targetDom){
       if(targetDom.children.length === 0){
         return true
       }
       return false;
     }

     // 添加dom的方法
     function addProList(targetDom,cat_id,pagesize){

       if(isEmpty(targetDom)) {
         //童装
         myajax.get("http://h6.duchengjiu.top/shop/api_goods.php", {
           "cat_id": cat_id, "pagesize": pagesize
         }, function(error, responseText) {
           var json = JSON.parse(responseText);
           var data = json.data;
           targetDom.innerHTML = '';
           for (var i = 0; i < data.length; i++) {
             var obj = data[i];
             targetDom.innerHTML += `
              <li class="mainProListItem">
              <a href="goodsDetail.html?goods_id=${obj.goods_id}">
              <div class="ProListImg">
              <img src="${obj.goods_thumb}"/>
              <div class="mark"></div>
              </div>
              <div class="ProListInfor">
               <h3 class="ProName" title="${obj.goods_name}">${obj.goods_name}</h3>
              <p class="des">${obj.goods_desc}</p>
              <span class="price"><i>&yen;</i>${obj.price}</span>
              </div>
              </a>
              </li>
              `;
           }
         });
       }
     }
})();




