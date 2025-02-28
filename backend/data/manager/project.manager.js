import { Project } from "../../models/project.model.js";
import { generateErrorMsg } from "../../lib/errorLib.js";

const ProjectManager = {
    createProject: (payload) => {
        return new Promise((resolve, reject) => {
            Project.create(payload)
                .then((project) => {
                    resolve(project);
                })
                .catch((err) => {
                    reject(generateErrorMsg("createProject", err));
                })
        })
    },

    getProject: (searchQuery) => {
        return new Promise((resolve, reject) => {
            Project.findOne(searchQuery)
                .then((result) => {
                    resolve(JSON.parse(JSON.stringify(result)));
                })
                .catch((err) => {
                    reject(generateErrorMsg("getProject", err));
                })
        })
    },

    getAllProjects: () => {
        return new Promise((resolve, reject) => {
            Project.findAll()
                .then((result) => {
                    resolve(JSON.parse(JSON.stringify(result)));
                })
                .catch((err) => {
                    reject(generateErrorMsg("getAllProjects", err));
                })
        })
    },

    addUsersToProject: (updateQuery, searchQuery) => {
        return new Promise((resolve, reject) => {
            Project.update(updateQuery, searchQuery)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(generateErrorMsg("addUsersToProject", err));
                })
        })
    }
}

export { ProjectManager };