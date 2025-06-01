import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../domain/user/repositories/IUserRepository";
import { User } from "../../domain/user/entities/entities";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        role: user.role,
      },
    });
    return new User(created.id, created.email, created.name, created.password, created.phone, created.role);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) return null;
    return new User(found.id, found.email, found.name, found.password, found.phone, found.role);
  }

  async findById(id: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    if (!found) return null;
    return new User(found.id, found.email, found.name, found.password, found.phone, found.role);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = await prisma.user.update({
      where: { id },
      data,
    });
    return new User(updated.id, updated.email, updated.name, updated.password, updated.phone, updated.role);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
