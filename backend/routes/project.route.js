import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { body } from "express-validator";  

const router = Router();

router.post(
    "/create",
    authUser,
    body("name").isString().withMessage("Name is required"),
    projectController.createProjectController
);

router.get(
    "/all",
    authUser,
    projectController.getAllProjectsController
);

router.put(
    "/add-user",
    authUser,
    body("projectId").isString().withMessage("Project id is required"),
    body("users").isArray().withMessage("Users are required").bail().custom((users) => users.every((user) => typeof user === "string")).withMessage("Users must be an array of strings"),
    projectController.addUsersController
)

router.get(
    "/get-project/:projectId",
    authUser,
    projectController.getProjectController
)

export default router;