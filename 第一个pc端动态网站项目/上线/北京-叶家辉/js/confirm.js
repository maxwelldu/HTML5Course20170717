(function(){
  // 遮罩层
  var oMask = null;
  // 内容层
  var oDiv = null;
  var succHandler = null;
  var failHandler = null;
  function confirm(txt, succ, fail) {
    succHandler = succ;
    failHandler = fail;
    oMask = createElement('div');
    oMask.flag = 'mask';
    oMask.onclick = handleClick;
    oMask.onselectstart
    oMask.className = 'mask';

    oDiv = createElement('div');
    oDiv.className = 'confirm';
    oMask.appendChild(oDiv);

    var oTitle = createElement('div', txt);
    oTitle.className = 'title';
    oDiv.appendChild(oTitle);

    var oBtnOK = document.createElement('span');
    oBtnOK.flag = 'ok';
    oBtnOK.innerText = "确定";
    oBtnOK.className = 'ok';
    oDiv.appendChild(oBtnOK);

    var oBtnCancel = document.createElement('span');
    oBtnCancel.flag = 'cancel';
    oBtnCancel.className = 'cancel';
    oBtnCancel.innerText = "取消";
    oDiv.appendChild(oBtnCancel);
    document.body.appendChild(oMask);
    oDiv.style.marginTop = -parseInt(fetchComputedStyle(oDiv, 'height')) / 2 + 'px';
  }

  function handleClick(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.flag === 'ok') {
      document.body.removeChild(oMask);
      succHandler && succHandler();
    } else if (target.flag === 'cancel') {
      document.body.removeChild(oMask);
      failHandler && failHandler();
    } else if (target.flag === 'mask') {
      shakeDiv();
    }
  }

  function shakeDiv() {
    var i = 0;
    var timer = setInterval(function(){
      oDiv.style.border = i % 2 === 0 ? "1px solid red" : "0px";
      oDiv.style.backgroundColor = i % 2 === 0 ? 'white' : 'black';
      i++;
      if (i >= 6) {
        clearInterval(timer);
      }
    }, 100);
  }

  function createElement(tagName, value) {
    value = value || "";
    var o = document.createElement(tagName);
    o.innerText = value;
    return o;
  }

  function fetchComputedStyle(obj, property) {
    if (window.getComputedStyle) {
      property = property.replace(/[A-Z]/g, function(match) {
        return '-' + match.toLowerCase();
      });
      return window.getComputedStyle(obj)[property];
    } else {
      property = property.replace(/-(a-z)/g, function(match, $1) {
        return $1.toUpperCase();
      })
      return obj.currentStyle[property];
    }
  }

  window.confirm = confirm;

})();
