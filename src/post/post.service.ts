import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({
      data: createPostDto,
    });
  }

  findAll(): Promise<Post[]> {
    return this.prismaService.post.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({
      where: { id },
    });
  }
}
