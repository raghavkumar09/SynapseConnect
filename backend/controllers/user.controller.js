import { validationResult } from "express-validator";
import { UserManager } from "../data/manager/user.manager.js";
import { generateAuthToken } from "../middleware/auth.middleware.js";
import bcrypt from 'bcrypt';

export const loginController = async (req, res) => {
    const errors = validationResult(req.body.payload);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing' });
        }

        let params = req.body.payload;
        let searchQuery = {
            where: {
                email: params.email
            },
            attributes: ['id', 'email', 'password', 'status'] // show in frontend or user profile
        };

        let userProfile = await UserManager.getUserDetail(searchQuery);
        if (!userProfile) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (userProfile.status == "Inactive") {
            return res.status(404).json({ success: false, message: 'Invalid User Please Contact the Administrator' })
        }

        let isValidPassword = await bcrypt.compare(params.password, userProfile.password);
        if (!isValidPassword) {
            return res.status(404).json({ success: false, message: 'Invalid Password' });
        }

        const token = await generateAuthToken(userProfile);
        return res.status(200).json({ success: true, message: 'Login successful', token: token, data: userProfile });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

export const createUserController = async (req, res) => {
    const errors = validationResult(req.body.payload);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing' });
        }

        let params = req.body.payload;
        let searchQuery = {
            where: {
                email: params.email
            }
        }

        let userProfile = await UserManager.getUserDetail(searchQuery);
        
        if (userProfile) {
            return res.status(404).json({ success: false, message: 'User already registered with same email' })
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(params.password, salt);
        const payload = {
            email: params.email,
            password: passwordHash,
            salt: salt
        }
        let user = await UserManager.createUser(payload);

        let tokenPlayload = {
            id: user.id,
            email: user.email
        }

        let token = await generateAuthToken(tokenPlayload);

        return res.status(201).json({ success: true, message: 'User created successfully', data: user, token: token });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

export const getAllUsersController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let users = await UserManager.getAllUsers();
        return res.status(200).json({ success: true, message: 'Users fetched successfully', data: users });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

export const getUserProfileController = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: 'Users fetched successfully', data: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}