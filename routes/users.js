const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid user ID format')
], usersController.getSingle);

router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').notEmpty().withMessage('Role is required'),
], usersController.createUser);

router.put('/:id', [
    param('id').isMongoId().withMessage('Invalid user ID format'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').notEmpty().withMessage('Role is required'),
], usersController.updateUser);

router.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid user ID format')
], usersController.deleteUser);

module.exports = router;
