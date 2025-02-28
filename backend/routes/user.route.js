import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { valiadateAccessToken } from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post(
    "/register",
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isStrongPassword().withMessage("Password is not strong enough"),
    userController.createUserController
);

router.post("/login",
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isStrongPassword().withMessage("Password is not strong enough"),
    userController.loginController
);

router.get("/profile", valiadateAccessToken, userController.getUserProfileController);

// router.post("/logout", authUser, userController.logoutController);

router.get("/all", valiadateAccessToken, userController.getAllUsersController);

export default router;