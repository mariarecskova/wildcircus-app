const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const performanceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    duration: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    admin: {
        type: Schema.Types.ObjectId,
        ref: "User" //here I am referring to the User schema
    }
});
module.exports = mongoose.model("Performance", performanceSchema);
