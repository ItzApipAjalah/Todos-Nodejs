const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

class SupabaseService {
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getAllTodos(userId) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async createTodo(todoData, userId) {
    const { data, error } = await supabase
      .from('todos')
      .insert([{
        title: todoData.title,
        description: Array.isArray(todoData.description) 
          ? JSON.stringify(todoData.description)
          : JSON.stringify([todoData.description]),
        category: todoData.category || 'others',
        priority: todoData.priority || 'low',
        duedate: new Date(todoData.dueDate).toISOString(),
        status: 'pending',
        user_id: userId
      }])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async updateTodo(id, status, userId) {
    const { data, error } = await supabase
      .from('todos')
      .update({ status })
      .eq('id', id)
      .eq('user_id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async deleteTodo(id, userId) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    
    if (error) throw error;
  }

  async editTodo(id, todoData, userId) {
    const { data, error } = await supabase
      .from('todos')
      .update({
        title: todoData.title,
        description: Array.isArray(todoData.description) 
          ? JSON.stringify(todoData.description)
          : JSON.stringify([todoData.description]),
        category: todoData.category,
        priority: todoData.priority,
        duedate: new Date(todoData.dueDate).toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
}

module.exports = new SupabaseService(); 