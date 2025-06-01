import { GetUser, LoginUser, RegisterUser } from "../../domain/user/usecase/user.usecase";
import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/prisma/userRepository";

const userRepository = new UserRepository();

  export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const registerUser = new RegisterUser(userRepository);
      const user = await registerUser.execute(req.body);
      res.status(201).json({ message: "User registered", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const loginUser = new LoginUser(userRepository);
      const { email, password } = req.body;
      const result = await loginUser.execute(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const getUser = new GetUser(userRepository);
      const user = await getUser.execute(req.params.id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
