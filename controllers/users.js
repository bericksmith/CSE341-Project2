const User = require('../models/users');
const { validationResult } = require('express-validator');

// #swagger.tags = ['Users']
// #swagger.summary = 'Get all users'
// #swagger.description = 'Retrieve a list of all users'
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

// #swagger.tags = ['Users']
// #swagger.summary = 'Get a user by ID'
// #swagger.description = 'Retrieve a user by their ID'
// #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
const getSingle = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

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
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status,
            dob: req.body.dob,
            location: req.body.location,
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error occurred', error: error.message });
    }
};

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
const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status,
            dob: req.body.dob,
            location: req.body.location,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(204).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

// #swagger.tags = ['Users']
// #swagger.summary = 'Delete a user by ID'
// #swagger.description = 'Delete a user by their ID'
// #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
