const supabaseService = require('../services/supabaseService');

exports.getLogin = (req, res) => {
  res.render('auth/login', { messages: req.flash() });
};

exports.getSignup = (req, res) => {
  res.render('auth/signup', { messages: req.flash() });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, session } = await supabaseService.signIn(email, password);
    req.session.user = user;
    req.session.token = session.access_token;
    res.redirect('/');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/auth/login');
  }
};

exports.postSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    await supabaseService.signUp(email, password);
    req.flash('success', 'Registration successful! Please check your email to confirm your account.');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  }
};

exports.logout = async (req, res) => {
  try {
    await supabaseService.signOut();
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    res.redirect('/');
  }
}; 