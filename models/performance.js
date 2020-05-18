const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const performanceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    // image: {
    //     type: String,
    //     required: true
    // },

    date: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model("Performance", performanceSchema);
