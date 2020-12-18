const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ModpacksController.js');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}


module.exports = router => {
router.get('/modpacks', auth, index);
  router.get('/modpacks/new', auth, _new); 
  router.post('/modpacks', auth, create); 
  router.post('/modpacks/update', auth, update); 
  router.post('/modpacks/delete',auth,  _delete); 
  router.post('/modpacks/:id/edit', auth, edit);
  router.get('/modpacks/:id', auth, show); 
};