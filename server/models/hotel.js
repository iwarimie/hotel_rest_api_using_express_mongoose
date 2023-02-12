const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Array,
        required: true
    }
});

hotelSchema.index({"$**": 'text'});
module.exports = mongoose.model('Hotel', hotelSchema);