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
          username: 'admin',
          name: 'admin',
          password: hashedPassword,
        },
      });
      console.log('✅ Dummy admin created');
    } else {
      console.log('✅ Admin already exists, skipping seed');
    }
  }

  async seedProduct() {
    const existingProduct = await this.prisma.product.findFirst();
    if (!existingProduct) {
      await this.prisma.product.createMany({
        data: [
          { name: 'Product 1', price: 10, description: '<p>Description 1</p>', quantity: 10, onSale: false, },
          { name: 'Product 2', price: 20, description: '<p>Description 2</p>', quantity: 10, onSale: false, },
          { name: 'Product 3', price: 30, description: '<p>Description 3</p>', quantity: 10, onSale: false, },
        ],
      });
      console.log('✅ Dummy products created');
    } else {
      console.log('✅ Products already exist, skipping seed');
    }
  }

}
