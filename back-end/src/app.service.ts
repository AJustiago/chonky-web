import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  getHello(): string {
    return 'Hello from NestJS with Prisma!';
  }

  async seedAdmin() {
    const existingAdmin = await this.prisma.admin.findFirst();
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await this.prisma.admin.create({
        data: {
          email: 'dummy@gmail.com',
          name: 'admin',
          password: hashedPassword,
        },
      });
      console.log('✅ Dummy admin created');
    } else {
      console.log('✅ Admin already exists, skipping seed');
    }
  }
}
