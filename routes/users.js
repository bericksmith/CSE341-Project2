const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { validateUserId, validateUser } = require('../middleware/validators/users');
const { isAuthenticated } = require('../middleware/authenticate');

// #swagger.tags = ['Users']
// #swagger.summary = 'Get all users'
// #swagger.description = 'Retrieve a list of all users'
router.get('/', usersController.getAll);

// #swagger.tags = ['Users']
// #swagger.summary = 'Get a user by ID'
// #swagger.description = 'Retrieve a user by their ID'
// #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
router.get('/:id', validateUserId, usersController.getSingle);

// #swagger.tags = ['Users']
// #swagger.summary = 'Create a new user'
// #swagger.description = 'Create a new user by providing necessary details'
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           name: { type: 'string', description: 'Name of the user' },
//           email: { type: 'string', description: 'Email of the user' },
//           password: { type: 'string', description: 'Password for the user account' },
//           role: { type: 'string', description: 'User role' },
//           status: { type: 'string', description: 'Status of the user' },
//           dob: { type: 'string', format: 'date', description: 'Date of birth of the user' },
//           location: { type: 'string', description: 'Location of the user' }
//         },
//         required: ['name', 'email', 'password']
//       }
//     }
//   }
// }
router.post('/', isAuthenticated, validateUser, usersController.createUser);

// #swagger.tags = ['Users']
// #swagger.summary = 'Update a user by ID'
// #swagger.description = 'Update user details by providing necessary information'
// #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
// #swagger.requestBody = {
//   required: true,
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         properties: {
//           name: { type: 'string', description: 'Updated name of the user' },
//           email: { type: 'string', description: 'Updated email of the user' },
//           password: { type: 'string', description: 'Updated password of the user' },
//           role: { type: 'string', description: 'Updated role of the user' },
//           status: { type: 'string', description: 'Updated status of the user' },
//           dob: { type: 'string', format: 'date', description: 'Updated date of birth of the user' },
//           location: { type: 'string', description: 'Updated location of the user' }
//         },
//         required: ['name', 'email']
//       }
//     }
//   }
// }
router.put('/:id', isAuthenticated, [validateUserId, validateUser], usersController.updateUser);

// #swagger.tags = ['Users']
// #swagger.summary = 'Delete a user by ID'
// #swagger.description = 'Delete a user by their ID'
// #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
router.delete('/:id', isAuthenticated, validateUserId, usersController.deleteUser);

module.exports = router;