const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    // password: {
    //     type: String,
    //     required: true
    // },

    createdPerformances: [
        {
            type: Schema.Types.ObjectId,
            ref: "Performance" //here I tell that I am connecting it with the Performance model
        }

    ]
})

module.exports = mongoose.model("User", userSchema);