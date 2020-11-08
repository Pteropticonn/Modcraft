const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ModpacksController.js');

module.exports = router => {
router.get('/modpacks', index);
  router.get('/modpacks/new', _new); 
  router.post('/modpacks', create); 
  router.post('/modpacks/update', update); 
  router.post('/modpacks/delete', _delete); 
  router.post('/modpacks/:id/edit', edit);
  router.get('/modpacks/:id', show); 
};