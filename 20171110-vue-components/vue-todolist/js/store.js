var STORAGE_KEY = 'todoList'
window.todoStorage = {
	fetch() {
    try {
  		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch(error) {
      return [];
    }
	},
	save(todoList) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
	}
}
