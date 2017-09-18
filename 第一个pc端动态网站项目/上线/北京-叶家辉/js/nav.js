window.onload=function () {
    var navLi = document.querySelector('#proList').querySelectorAll('li');
    changeClass(navLi,localStorage.currentNav,'current');
}
