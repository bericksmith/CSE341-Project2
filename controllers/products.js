const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Products Get All']
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Products Get Single']
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
    })
};

const createProduct = async (req, res) => {
    //#swagger.tags=['Products Create New']
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        added: req.body.added,
        updated: req.body.updated,
        location: req.body.location,
    }
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the product.');
    }
}

const updateProduct = async (req, res) => {
    //#swagger.tags=['Products Update']
    const productId = new ObjectId(req.params.id);
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        added: req.body.added,
        updated: req.body.updated,
        location: req.body.location,
    }
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the product.');
    }
}

const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products Delete']
    const productId = new ObjectId(req.params.id);
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        added: req.body.added,
        updated: req.body.updated,
        location: req.body.location,
    }
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the product.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};