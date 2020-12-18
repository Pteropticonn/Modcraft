const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    validate: [{
        validator: function (value) {
          return this.emailConfirmation === value;
        },
        message: props => `${props.value} doesn't match the email confirmation`
      },
      {
        validator: async function (value) {
          const emailCount = await this.model('User').count({
            email: value
          });
          return !emailCount;
        },
        message: props => `${props.value} exists. Please try a new email or login`
      }
    ]
  }, 
  modpacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modpack'
  }],
  mods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mod'
    //TODO: replace String values with associated ids from documents
    // default: ["Botania", "Biomes o' plenty", "Industrial Engineering", "Animania", "JEI"]
  }],
}, {
  timestamps: true,
});

// Validation attributes
UserSchema.virtual('emailConfirmation')
  .get(function () {
    return this._emailConfirmation;
  })
  .set(function (value) {
    this._emailConfirmation = value;
  });

UserSchema.virtual('password')
  .get(function () {
    return this._password;
  })
  .set(function (value) {
    this._password = value;
  });

UserSchema.virtual('passwordConfirmation')
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (value) {
    if (this.password !== value)
      this.invalidate('password', 'Password and password confirmation must match');
    this._passwordConfirmation = value;
  });

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);