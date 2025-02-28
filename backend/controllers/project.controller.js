import { where } from "sequelize";
import {ProjectManager} from "../data/manager/project.manager.js";
import { validationResult } from "express-validator";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req.body.payload);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing' });
        }    
        let params = req.body.payload;

        let payload = {
            name: params.name,
            userId: req.user.id
        }
        let project = await ProjectManager.createProject(payload);
        return res.status(200).json({ success: true, message: 'Project created successfully', data: project });    
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

export const getAllProjectsController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let projects = await ProjectManager.getAllProjects();
        return res.status(200).json({ success: true, message: 'Projects fetched successfully', data: projects });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

export const getProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let searchQuery = {
            where: {
                id: req.params.projectId
            }
        }
        let project = await ProjectManager.getProject(searchQuery);
        return res.status(200).json({ success: true, message: 'Project fetched successfully', data: project });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}

export const addUsersController = async (req, res) => {
    console.log("param ", req.body.payload)
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
                id: params.projectId
            }
        }
        let updateQuery = {
            id: params.projectId,
            users: params.users
        }

        let addedUsers = await ProjectManager.addUsersToProject(updateQuery, searchQuery);
        return res.status(200).json({ success: true, message: 'Users added successfully', data: addedUsers });
    } catch (error) {
        res.status(409).json({ success: false, message: error.message })
    }
}