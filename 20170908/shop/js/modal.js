function Modal(selector) {
  //控制模态框的位置
  this.windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
  this.oContainer = document.querySelector('.container');
  this.containerHeight = this.oContainer.clientHeight;
  this.oContainer.style.top = (this.windowHeight - this.containerHeight) / 2 + 'px';
  this.oModal = document.querySelector('.modal');
  this.oBtn = document.querySelector(selector);
  this.bindEvent();
}
Modal.prototype.bindEvent = function() {
  this.oModal.onclick = (event) => {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.className === 'close' || target.className === 'modal') {
      this.hide();
    }
  }

  this.oBtn.onclick = () => {
    this.show();
  }
}
Modal.prototype.hide = function() {
    this.oModal.style.display = 'none';
}
Modal.prototype.show = function() {
    this.oModal.style.display = "block";
}
