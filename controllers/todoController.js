const storageService = require('../services/storageService');

exports.getAllTodos = async (req, res) => {
  try {
    let todos = await storageService.getAllTodos(req.session.user);
    
    // Filter todos based on status query parameter
    if (req.query.status) {
      todos = todos.filter(todo => todo.status === req.query.status);
    }
    
    res.render('index', { 
      todos,
      user: req.session.user,
      query: req.query,
      todosJson: JSON.stringify(todos)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    await storageService.createTodo({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      dueDate: req.body.dueDate
    }, req.session.user);
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    // Check if this is a status update or a full edit
    if (req.body.status) {
      // This is a status update
      await storageService.updateTodo(
        req.params.id,
        req.body.status,
        req.session.user
      );
    } else {
      // This is a full edit
      await storageService.editTodo(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          priority: req.body.priority,
          dueDate: req.body.dueDate
        },
        req.session.user
      );
    }
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await storageService.deleteTodo(req.params.id, req.session.user);
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 