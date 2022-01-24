const mongoose = require('mongoose')

const basketSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    items: {
        type: Array,
    }
}, {timestamps: true})

const Basket = mongoose.model('Basket', basketSchema)

module.exports = Basket;