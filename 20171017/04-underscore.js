let _ = require('underscore');
console.log(_);
let arr = [1,2,3,4,5];
arr = _.without(arr, 5);
console.log(arr);
