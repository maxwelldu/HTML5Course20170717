(function(){
  var modelBox = document.querySelector("#modelBox");
  var modelBoxClose = modelBox.querySelector("#modelBoxClose");

  modelBoxClose.addEventListener('click',function(){
    hidden(modelBox);
  },false);
})();