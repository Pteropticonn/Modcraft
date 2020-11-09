const viewPath = 'mods';
const Mod = require('../models/mod');
const mods = require('../routes/mods');
const User = require('../models/user');

exports.index = async (req, res) => {
  try {
    const mods = await Mod
      .find()
      .populate('user')
      .sort({
        title: 'desc'
      })
      .limit(20);

    console.log(mods);

    res.render(`${viewPath}/index`, {
      pageTitle: 'Mods',
      mods: mods
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying your Mods: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const mod = await Mod.findById(req.params.id)
      .populate('user');
    //viewpath defined as such to have new req send associated id
    res.render(`${viewPath}/show`, {
      pageTitle: mod.title,
      fileSize: mod.fileSize,
      version: mod.version,
      description: mod.description,
      mod: mod
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this mod: ${error}`);
    res.redirect('/');
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Mod'
  });
};

exports.create = async (req, res) => {
  try {

    const mod = await Mod.create({
      
      ...req.body
    });

    req.flash('success', 'mod created successfully');
    res.redirect(`/mods/${mod.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this mod: ${error}`);
    req.session.formData = req.body;
    res.redirect('/mods/new');
  }
};

//edit functionality divvied into two types: details, and version control w/ query to curseforge for correct version and all meta info
exports.edit = async (req, res) => {
  try {
    const mod = await Mod.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: mod.title,
      formData: mod
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this mod: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    //TODO: restructure database so that users simply grab a reference to the single document stored for each mod
    // const {
    //   user: email
    // } = req.session.passport;
    // const user = await User.findOne({
    //   email: email
    // });

    let mod = await Mod.findById(req.body.id);
    if (!mod) throw new Error('Mod could not be found');

    const attributes = {
      ...req.body
    };
    await Mod.validate(attributes);
    await Mod.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The mod was updated successfully');
    res.redirect(`/mods/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this mod: ${error}`);
    res.redirect(`/mods/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await od.deleteOne({
      _id: req.body.id
    });
    req.flash('success', 'The mod was deleted successfully');
    res.redirect(`/mods`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this mod: ${error}`);
    res.redirect(`/mods`);
  }
};