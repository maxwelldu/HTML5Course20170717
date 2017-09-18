(function () {
var oh1 = document.querySelector('#oh1');
var oTable = document.querySelector('#order-table');

myajax.get('http://h6.duchengjiu.top/shop/api_order.php', {token: localStorage.token}, function(err, responseText){
  var json = JSON.parse(responseText);
  console.log(json);
  var data = json.data;
  var goods;
  if (data.length === 0) {
    oh1.innerHTML = "<h1>您的订单为空!</h1>";
    return;
  }
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    var goodsHTML = '';
     var sums = 0;
    for (var j = 0; j < obj.goods_list.length; j++) {
      goods = obj.goods_list[j];
      
      var sum = `${goods.goods_price * goods.goods_number}`;
	  	sum = parseInt(sum);
			sums += sum;
      
      goodsHTML += `
      <tr>
        <td>
          <img src="${goods.goods_thumb}">
        </td>
        <td colspan="2" class="tb-mon">
          ${goods.goods_name}
        </td>
        <td class="tb-mon">\¥&nbsp;&nbsp;${goods.goods_price}</td>
        <td class="tb-mon">${goods.goods_number}</td>
        <td class="tb-mon"><p>申请售后</p><p>投诉商家</p></td>
        <td class="tb-mon">\¥&nbsp;&nbsp;${sum}</td>
        <td class="tb-teal"><p>交易成功</p><p>订单详情</p></td>
        <td class="tb-teal"><a href="">评价</a></td>
      </tr>
      `;
      
    }

    oTable.innerHTML += `
    	<table>
        <thead>
          <th colspan="4">&nbsp;&nbsp;&nbsp;订单号:${parseInt(Math.random()*10000000000)}${obj.order_id}</th>
          <th colspan="4">总付款:\¥&nbsp;&nbsp;${sums}</th>
          <th><span data-id="${obj.order_id}" class="cancel-order" name="order"></span></th>
        </thead>
          ${goodsHTML}
      </table>
    `;
  }
  
		var oOrder = document.querySelectorAll('span[name=order]');
		var oTablebox = document.querySelector('table');
		console.log(oOrder);
		for(var i = 0 ; i < oOrder.length;i ++){
			  oOrder[i].index = i;
				oOrder[i].onclick = function(event) {
			  event = event || window.event;
			  var self=this;
			  var target = event.target || event.srcElement;
			  if (target.className === 'cancel-order') {
//			    if (!confirm('确认要取消订单吗?')) {
//			      return;
//			    }
//			    var order_id = target.dataset.id;
//			    myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id}, function(err, responseText) {
//			      var json = JSON.parse(responseText);
//			      if (json.code === 0) {
////			        alert('订单删除成功！');
//								toast("订单取消成功!",3000);
//			        oOrder[self.index].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(oOrder[self.index].parentNode.parentNode.parentNode.parentNode);			      
//			      }
//			    });
//			  }
//			}
//		}
//	})
//})()
				var order_id = target.dataset.id;
				myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id}, function(err, responseText) {
		      confirm('确认要取消订单吗？', function(){
//		        console.log('删除成功');
						toast("订单取消成功!",2000);
	        	oOrder[self.index].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(oOrder[self.index].parentNode.parentNode.parentNode.parentNode);
	      		}, function(){
	       			console.log('取消删除');
      			});
					})
			 	}
			}
		}
	})
})()