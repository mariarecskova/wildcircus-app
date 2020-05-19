const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
//here I require the password encrypting dependency

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true
    },

    createdPerformances: [
        {
            type: Schema.Types.ObjectId,
            ref: "Performance" //here I am connecting it with the Performance model
        }

    ]
})
// creating a pre-hook
userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};
userSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};


module.exports = mongoose.model("User", userSchema);