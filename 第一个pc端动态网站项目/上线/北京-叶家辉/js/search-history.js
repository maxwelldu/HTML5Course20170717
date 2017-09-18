(function () {
	var oSearchUlHistory = document.querySelector('#searchulhistory');
	var oGoodsSearch = document.querySelector('input[name=search_text]'); 
	oSearchUlHistory.innerHTML += `<li>${oGoodsSearch.value}</li>`;
})()