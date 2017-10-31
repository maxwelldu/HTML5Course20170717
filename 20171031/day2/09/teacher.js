var Teacher = function (name) {
	this.name = name;
}

Teacher.prototype.ask = function(question) {
	Observer.fire(question)
}