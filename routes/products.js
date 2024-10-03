const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const { validateProductId, validateProduct } = require('../middleware/validators/products');

// #swagger.tags = ['Products']
// #swagger.summary = 'Get all products'
// #swagger.description = 'Retrieve a list of all products'
router.get('/', productsController.getAll);

// #swagger.tags = ['Products']
// #swagger.summary = 'Get a product by ID'
// #swagger.description = 'Retrieve a product by its ID'
// #swagger.parameters['id'] = { description: 'Product ID', in: 'path', required: true }
router.get('/:id', validateProductId, productsController.getSingle);

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
router.post('/', validateProduct, productsController.createProduct);

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
router.put('/:id', [validateProductId, validateProduct], productsController.updateProduct);

// #swagger.tags = ['Products']
// #swagger.summary = 'Delete a product by ID'
// #swagger.description = 'Delete a product by its ID'
// #swagger.parameters['id'] = { description: 'Product ID', in: 'path', required: true }
router.delete('/:id', validateProductId, productsController.deleteProduct);

module.exports = router;
