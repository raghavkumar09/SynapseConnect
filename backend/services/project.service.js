import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
    if(!name || !userId) {
        throw new Error("Name and userId are required");
    }

    const project = await projectModel.create({ name, users: [userId] });
    return project;
}

export const getAllProjects = async ({ userId }) => {
    if(!userId) {
        throw new Error("userId is required");
    }

    const allUsersProjects = await projectModel.find({ users: userId });
    return allUsersProjects;
}

export const addUserToProject = async (projectId, users, userId) => {
    if(!projectId || !users) {
        throw new Error("ProjectId and users are required");
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId");
    }

    if(!Array.isArray(users) || !users.every((user) => mongoose.Types.ObjectId.isValid(user))) {
        throw new Error("Users must be an array");
    }

    if(!userId) {
        throw new Error("userId is required");
    }

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    });

    console.log("Project: ", project);

    if(!project) {
        throw new Error("User is not a member of the project");
    }

    const updatedProject = await projectModel.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { users: users } },
        { new: true }
    );
    return updatedProject;
}

export const getProject = async (projectId) => {
    if(!projectId) {
        throw new Error("ProjectId is required");
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId");
    }

    // populate users - to get user details
    const project = await projectModel.findById(projectId).populate("users");
    return project;
}
