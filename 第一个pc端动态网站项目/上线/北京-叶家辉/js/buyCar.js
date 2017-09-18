(function(){
  var bcProListCon = document.querySelector('#bcProListCon');
  var sumPrice = document.querySelector('#sumPrice');
  var count = 0;                      //用于记录商品当前数量

  bcProListCon.addEventListener('click',function(event){
    event = event || window.event;
    var target = event.target || event.srcElement;

    //判断点击的是不是用于记商品数量的按钮
    if(target.classList.contains('isCount')){
      changeCount(target);
      changeMoney(target);
    } else if(target.classList.contains('operationDel')){
      //deletePro(target);
    }
    changeTotalAmount();
  },false);

// 改变商品数量
  function changeCount(targetDom){
    var maxPro = 10;                  // 设置最大购买数量
    var oCountSpan = targetDom.parentNode;
    var oCountInput = oCountSpan.querySelector('input');
    count = parseInt(oCountInput.value);

    // 点击左键
    if(targetDom.classList.contains('countLeft')){
      count--;
      if(count < 1){
        count = 1;
      }
    }

    //点击右键
    if(targetDom.classList.contains('countRight')){
      count++;
      if(count > maxPro){
        count = maxPro;
      }
    }
    oCountInput.value = count;
  }

// 改变金额, 这里其实后台会自动将所有的商品单价传过来的
  function changeMoney(targetDom){
    var bcProListItem = targetDom.parentNode.parentNode.parentNode;
    var unitPrice = bcProListItem.querySelector('.unitPrice').querySelector('.unitPriceSpan');
    var singleSum = bcProListItem.querySelector('.singleSum').querySelector('.singleSumSpan');
    singleSum.innerHTML = parseInt(unitPrice.innerText) * count;
  }

// 改变总价
  function changeTotalAmount(){
    var sum = 0;
    var allBcProListItem = document.querySelectorAll('.bcProListItem');
    for(var i = 0; i < allBcProListItem.length; i++){
      sum += parseInt(allBcProListItem[i].querySelector('.singleSumSpan').innerText);
    }
    sumPrice.innerText = sum;
  }

// 页面加载完就执行这个函数
  changeTotalAmount();

// 删除商品
  function deletePro(target){
    var iNow = target.parentNode.parentNode;
    bcProListCon.removeChild(iNow);
  }

// 删除全部商品

})();
