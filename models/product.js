const {Schema, model} = require("mongoose");
const Joi = require("joi");

const productSchema = Schema({
    // нужно сделать схему продукта
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {versionKey: false, timestamps: true});

const add = Joi.object({
})


const schemas = {
    add,
}

const Product = model("product", productSchema);
// categories => category
// mice => mouse

module.exports = {
    Product,
    schemas
};