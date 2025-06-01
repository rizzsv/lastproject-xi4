import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/entities";
import { AuthService } from "../services/AuthService";
import {v4 as uuidv4} from "uuid";

// --- Register User ---
export class RegisterUser {
    constructor (private userRepository: IUserRepository) {}

    async execute(data:{
        email: string,
        name?: string,
        password: string,
        phone?: string,
        role?: "USER" | "ADMIN"
    }) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashPassword = await AuthService.hashPassword(data.password);

        const user = new User(
            uuidv4(),
            data.email,
            data.name || null,
            hashPassword,
            data.phone || null,
            data.role || "USER"
        )
        const createdUser = await this.userRepository.create(user);
        return createdUser;
    }
}

// --- Login User ---
export class LoginUser {
   constructor (private userRepository: IUserRepository) {}
   
   async execute (email: string, password: string) {
       const user = await this.userRepository.findByEmail(email);
       if (!user) {
           throw new Error("Email not found");
       }

       const valid = await AuthService.comaparePassword(password, user.password);
       if (!valid) {
           throw new Error("Invalid password");
       }

       const token = AuthService.generateToken(user);
       return { token, user};
   }
}

// --- Get User ---
export class GetUser {
    constructor (private userRepository: IUserRepository) {}
    
    async execute (id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}

// --- Create User ---
export class CreateUser {
    constructor (private userRepository: IUserRepository) {}

    async execute (data: {
        email: string,
        name?: string,
        password: string,
        phone?: string,
        role?: "USER" | "ADMIN"
    }) {
        const user = new User(
            uuidv4(),
            data.email,
            data.name || null,
            data.password,
            data.phone || null,
            data.role || "USER"
        )
    }
}

