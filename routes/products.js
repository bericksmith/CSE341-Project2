const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getAll);

router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid product ID format')
], productsController.getSingle);

router.post('/', [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], productsController.createProduct);

router.put('/:id', [
    param('id').isMongoId().withMessage('Invalid product ID format'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], productsController.updateProduct);

router.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid product ID format')
], productsController.deleteProduct);

module.exports = router;