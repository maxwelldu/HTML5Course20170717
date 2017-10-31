var Student = function (name, answer) {
	this.name = name;
	this.answer = answer;
	// 学生回答问题的一个私有方法
	var that = this;
	that.replay = function () {
		// 输出问题，以及答案和学生的name
		console.log(that.name + that.answer);
	}
}

Student.prototype.listen = function (question) {
	Observer.regist(question, this.replay);
}
Student.prototype.sleep = function (question) {
	Observer.remove(question, this.replay)
}