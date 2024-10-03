const { body, param } = require('express-validator');

const validateUserId = [
    param('id').isMongoId().withMessage('Invalid user ID format'),
];

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').notEmpty().withMessage('Role is required'),
];

module.exports = {
    validateUserId,
    validateUser
};
