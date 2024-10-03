const { body, param } = require('express-validator');

const validateProductId = [
    param('id').isMongoId().withMessage('Invalid product ID format'),
];

const validateProduct = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

module.exports = {
    validateProductId,
    validateProduct
};