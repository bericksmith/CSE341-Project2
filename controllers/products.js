const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['Products Get All']
        const result = await mongodb.getDatabase().db().collection('products').find();
        const products = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Products Get Single']
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });

        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
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
        };

        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Product created successfully', productId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create product' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error occurred', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
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
        };

        const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        //#swagger.tags=['Products Delete']
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};