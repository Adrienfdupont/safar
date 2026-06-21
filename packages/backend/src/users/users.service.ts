import { Injectable } from "@nestjs/common";
import { User, CreateUserDto, ID } from "@safar/shared";

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  create(dto: CreateUserDto): User {
    const id: ID = crypto.randomUUID();
    const user: User = { id, email: dto.email, name: dto.name };
    this.users.push(user);
    return user;
  }

  findOne(id: ID): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
