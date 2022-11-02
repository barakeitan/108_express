const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = Schema({
    name: {
        type: String,
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    serviceArea: [{
        type: String,
        require: true
    }]
});

module.exports = mongoose.model("Supplier", supplierSchema);
