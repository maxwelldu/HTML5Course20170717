console.log(1);
process.nextTick(function(){
  console.log(3);
})
console.log(2);
