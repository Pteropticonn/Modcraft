const viewPath = 'modpacks';
const Modpack = require('../models/modpack');
const modpacks = require('../routes/modpacks');
const User = require('../models/user');

exports.index = async (req, res) => {
    try {
        const modpacks = await Modpack
        .find()
        .populate('user')
        .sort({title: 'desc'});
    
    res.render(`${viewPath}/index`, {
        pageTitle: 'Modpacks',
        modpacks: modpacks
    });
    } catch(error) {
        req.flash('danger', `There was an error displaying your Modpacks: ${error}`);
        res.redirect('/');
    }
};

exports.show = async (req, res) => {
    try {
      const modpack = await Modpack.findById(req.params.id)
        .populate('user');
      res.render(`${viewPath}/show`, {
        pageTitle: modpack.title,
        modpack: modpack
      });
    } catch (error) {
      req.flash('danger', `There was an error displaying this reservation: ${error}`);
      res.redirect('/');
    }
  };
  
  exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
      pageTitle: 'New Modpack'
    });
  };
  
  exports.create = async (req, res) => {
    try {
      const { user: userName } = req.session.passport;
      const user = await User.findOne({userName: userName});
      const modpack = await Modpack.create({user: user._id, ...req.body});
  
      req.flash('success', 'Reservation created successfully');
      res.redirect(`/reservations/${reservation.id}`);
    } catch (error) {
      req.flash('danger', `There was an error creating this reservation: ${error}`);
      req.session.formData = req.body;
      res.redirect('/reservations/new');
    }
  };
  
  //edit functionality divvied into two types: details, and version control w/ query to curseforge for correct version and all meta info
  exports.edit = async (req, res) => {
    try {
      const modpack = await Modpack.findById(req.params.id);
      res.render(`${viewPath}/edit`, {
        pageTitle: modpack.title,
        formData: modpack
      });
    } catch (error) {
      req.flash('danger', `There was an error accessing this modpack: ${error}`);
      res.redirect('/');
    }
  };
  
  exports.update = async (req, res) => {
    try {
      const { user: email } = req.session.passport;
      const user = await User.findOne({email: email});
  
      let reservation = await Reservation.findById(req.body.id);
      if (!reservation) throw new Error('Reservation could not be found');
  
      const attributes = {user: user._id, ...req.body};
      await Reservation.validate(attributes);
      await Reservation.findByIdAndUpdate(attributes.id, attributes);
  
      req.flash('success', 'The reservation was updated successfully');
      res.redirect(`/reservations/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this reservation: ${error}`);
      res.redirect(`/reservations/${req.body.id}/edit`);
    }
  };
  
  exports.delete = async (req, res) => {
    try {
      console.log(req.body);
      await Modpack.deleteOne({_id: req.body.id});
      req.flash('success', 'The reservation was deleted successfully');
      res.redirect(`/modpacks`);
    } catch (error) {
      req.flash('danger', `There was an error deleting this reservation: ${error}`);
      res.redirect(`/modpacks`);
    }
  };
  