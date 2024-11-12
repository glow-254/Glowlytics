const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwtService = require('../services/jwtService');
const passwordUtils = require('../utils/passwordUtils');

const prisma = new PrismaClient();

// Register a new user
async function register(req, res) {
    const { email, password, companyName } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await passwordUtils.hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                companyName,
            },
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

// Login user
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !(await passwordUtils.comparePassword(password, user.password))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwtService.generateToken(user);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

module.exports = {
    register,
    login,
};
