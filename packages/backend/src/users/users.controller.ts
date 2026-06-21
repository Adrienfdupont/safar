import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User, CreateUserDto } from "@safar/shared";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string): User | undefined {
    return this.usersService.findOne(id);
  }
}
