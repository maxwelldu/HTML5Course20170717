function c(){
  b();
};
function b(){
  a();
}
function a(){
  // throw new Error('here');
  setTimeout(function(){
    throw new Error('here');
  }, 10);
}
c();
