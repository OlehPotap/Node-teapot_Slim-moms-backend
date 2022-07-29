const {Product} = require("../models/product");

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Product.create({...req.body, owner});
    res.status(201).json(result);
}

const getAll = async (req, res)=> {
    const {_id: owner} = req.user;
    const result = await Product.find({owner})
    res.json(result);
}

const remove = async (req, res) => {

}

module.exports = {
    add,
    getAll,
    remove
};