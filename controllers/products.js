const Product = require('../models/products');
const { validationResult } = require('express-validator');

// #swagger.tags = ['Products']
// #swagger.summary = 'Get all products'
// #swagger.description = 'Retrieve a list of all products'
const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// #swagger.tags = ['Products']
// #swagger.summary = 'Get a product by ID'
// #swagger.description = 'Retrieve a product by its ID'
// #swagger.parameters['id'] = { description: 'Product ID', in: 'path', required: true }
const getSingle = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

// #swagger.tags = ['Products']
// #swagger.summary = 'Create a new product'
// #swagger.description = 'Create a new product by providing necessary details'
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           name: { type: 'string', description: 'Name of the product' },
//           description: { type: 'string', description: 'Description of the product' },
//           price: { type: 'number', description: 'Price of the product' },
//           category: { type: 'string', description: 'Category of the product' },
//           stock: { type: 'integer', description: 'Stock quantity' },
//           added: { type: 'string', format: 'date', description: 'Date when the product was added' },
//           updated: { type: 'string', format: 'date', description: 'Date when the product was last updated' },
//           location: { type: 'string', description: 'Location of the product' }
//         },
//         required: ['name', 'price', 'category', 'stock']
//       }
//     }
//   }
// }
const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            added: req.body.added,
            updated: req.body.updated,
            location: req.body.location,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', productId: savedProduct._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error occurred', error: error.message });
    }
};

// #swagger.tags = ['Products']
// #swagger.summary = 'Update a product by ID'
// #swagger.description = 'Update a product by providing updated information'
// #swagger.parameters['id'] = { description: 'Product ID', in: 'path', required: true }
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           name: { type: 'string', description: 'Updated name of the product' },
//           description: { type: 'string', description: 'Updated description of the product' },
//           price: { type: 'number', description: 'Updated price of the product' },
//           category: { type: 'string', description: 'Updated category of the product' },
//           stock: { type: 'integer', description: 'Updated stock quantity' },
//           updated: { type: 'string', format: 'date', description: 'Date when the product was last updated' },
//           location: { type: 'string', description: 'Updated location of the product' }
//         },
//         required: ['name', 'price', 'category', 'stock']
//       }
//     }
//   }
// }
const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            added: req.body.added,
            updated: req.body.updated,
            location: req.body.location,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found or no changes made' });
        }

        res.status(204).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// #swagger.tags = ['Products']
// #swagger.summary = 'Delete a product by ID'
// #swagger.description = 'Delete a product by its ID'
// #swagger.parameters['id'] = { description: 'Product ID', in: 'path', required: true }
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(204).json({ message: 'Product deleted successfully' });
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
