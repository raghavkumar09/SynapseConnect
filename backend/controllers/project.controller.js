import projectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name } = req.body;
        const userId = req.user._id;
        console.log(userId);

        const project = await projectService.createProject({ name, userId });
        res.status(201).json({ project });
    } catch (error) {
        console.log("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
}

export const getAllProjectsController = async (req, res) => {
    try {
        const allUserProject = await projectService.getAllProjects({ userId: req.user._id });
        res.status(200).json({ allUserProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addUsersController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { projectId, users } = req.body;

        const addedUsers = await projectService.addUserToProject(projectId, users, req.user._id);
        res.status(200).json({ addedUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProjectController = async (req, res) => {
    try {
        const project = await projectService.getProject(req.params.projectId);
        res.status(200).json({ project });
    } catch (error) {
        console.log("Error getting project:", error);
        res.status(500).json({ error: error.message });
    }
}