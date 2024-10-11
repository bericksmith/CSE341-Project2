const User = require('../models/users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

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

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing the password

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, // Use hashed password
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

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.params.id;
        let updatedData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            status: req.body.status,
            dob: req.body.dob,
            location: req.body.location,
        };

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(204).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Continue with your session handling logic
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
