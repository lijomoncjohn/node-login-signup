const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true, minlength: 6 },
    dob: { type: Schema.Types.Date, required: true },
    status: { type: Schema.Types.Boolean, required: true, default: true },
    addedOn: { type: Schema.Types.Date, default: Date.now() }
});

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function (next) {
    const users = this;
    if (!users.isModified('password')) return next();
    bcrypt.hash(users.password, 10, (err, hash) => {
        if (err) return next(err);
        users.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, res) => {
        if (err) {
            return cb(null, err);
        }
        cb(null, res);
    });
};

module.exports = mongoose.model('users', UserSchema, 'users');