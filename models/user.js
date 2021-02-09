const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Enter username"],
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 4,
        maxlength: 22,
        validate: [
            validator.isAlphanumeric,
            "Only letters and numbers (no spaces and extra symbols)",
        ],
    },
    email: {
        type: String,
        required: [true, "Enter email"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        maxlength: 22,
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "..."],
        default: "user",
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    emailConfirmToken: {
        type: String,
        default: null,
    },
    emailConfirmExpires: {
        type: Date,
        select: false,
    },
},{
    toJSON: {
        virtuals: true,
    },
});

userSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password") || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            this.passwordChangedAt = Date.now() - 30000;
            next();
        } else {
            next();
        }
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.comparePasswords = async (candidatePassword, userPassword) => {
    try {
        return await bcrypt.compare(candidatePassword, userPassword);
    } catch (e) {
        console.log(e);
    }
};

userSchema.methods.createEmailToken = function (){
    const emailToken = crypto.randomBytes(36).toString('hex');

    this.emailConfirmToken = crypto.createHash('sha256').update(emailToken).digest('hex');
    this.emailConfirmExpires = Date.now() + 10 * 60 * 1000;

    return this.emailConfirmToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;