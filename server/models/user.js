const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: { type: String, required: true, minlength: 2 },
    last_name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true, validate: { validator(value) { return validator.isEmail(value) } } },
    password: { type: String, required: true, minlength: 6 },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) { return next(); }

    bcrypt.hash(this.password, 10)
        .then(hashed => {
            this.password = hashed;
            next();
        })
        .catch(next);
});

userSchema.statics.validatePassword = function (candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword)
}

const User = mongoose.model('User', userSchema);