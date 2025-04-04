import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Admin } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdminCreateInput): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.admin.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  async findOneByEmail(email: string): Promise<Admin | null> {
    return this.prisma.admin.findUnique({ where: { email } });
  }
}
