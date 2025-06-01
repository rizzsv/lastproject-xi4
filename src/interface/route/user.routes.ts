import express from "express";
import { UserController } from "../controllers/userController";
import { loginValidation, registerValidation } from "../../middleware/user.middleware";
import { Jwt, verifyToken } from "../../helper/jwt.helper";


const router = express.Router();

router.post("/register", registerValidation, UserController.register);
router.post("/create",[verifyToken], registerValidation, UserController.register);
router.post("/login", loginValidation, UserController.login);
router.get("/:id", UserController.getUser);

export default router;