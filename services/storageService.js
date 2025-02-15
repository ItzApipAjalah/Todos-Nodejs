const supabaseService = require('./supabaseService');

class StorageService {
  constructor() {
    this.STORAGE_KEY = 'todos';
  }

  async getAllTodos(user = null) {
    if (user) {
      return await supabaseService.getAllTodos(user.id);
    }
    return [];
  }

  async createTodo(todoData, user = null) {
    if (user) {
      return await supabaseService.createTodo(todoData, user.id);
    }
    return null;
  }

  async updateTodo(id, status, user = null) {
    if (user) {
      return await supabaseService.updateTodo(id, status, user.id);
    }
    return null;
  }

  async deleteTodo(id, user = null) {
    if (user) {
      return await supabaseService.deleteTodo(id, user.id);
    }
  }

  async editTodo(id, todoData, user = null) {
    if (user) {
      return await supabaseService.editTodo(id, todoData, user.id);
    }
    return null;
  }
}

module.exports = new StorageService(); 