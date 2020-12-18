const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ModsController.js');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}


module.exports = router => {
router.get('/mods', auth, index);
  router.get('/mods/new', auth, _new); 
  router.post('/mods', auth, create); 
  router.post('/mods/update', auth, update); 
  router.post('/mods/delete', auth, _delete); 
  router.get('/mods/:id/edit', auth, edit);
  router.get('/mods/:id', auth, show); 
};