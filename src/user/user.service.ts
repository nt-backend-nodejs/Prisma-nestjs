import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: createUserDto });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
