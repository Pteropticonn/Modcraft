const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ModsController.js');

module.exports = router => {
router.get('/mods', index);
  router.get('/mods/new', _new); 
  router.post('/mods', create); 
  router.post('/mods/update', update); 
  router.post('/mods/delete', _delete); 
  router.get('/mods/:id/edit', edit);
  router.get('/mods/:id', show); 
};