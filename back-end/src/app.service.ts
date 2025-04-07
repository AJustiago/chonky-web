import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedAdmin();
    await this.seedProduct();
  }

  getHello(): string {
    return 'Hello from NestJS with Prisma!';
  }

  async seedAdmin() {
    const tableExists = await this.prisma.$queryRawUnsafe<boolean>(`
      SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'Admin'
      )
    `);

    if (!tableExists) {
      await this.prisma.$executeRawUnsafe(`
      CREATE TABLE "Admin" (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
      )
      `);
      console.log('✅ Admin table created');
    }

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
    const tableExists = await this.prisma.$queryRawUnsafe<boolean>(`
      SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'Product'
      )
    `);

    if (!tableExists) {
      await this.prisma.$executeRawUnsafe(`
      CREATE TABLE "Product" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL,
        description TEXT,
        quantity INT NOT NULL,
        onSale BOOLEAN NOT NULL,
        images TEXT[],
        colorways TEXT[]
      )
      `);
      console.log('✅ Product table created');
    }

    const existingProduct = await this.prisma.product.findFirst();
    if (!existingProduct) {
      await this.prisma.product.createMany({
        data: [
          { name: 'Product 1', price: 10, description: '<p>Description 1</p>', quantity: 10, onSale: false, images: ['/placeholder.svg'], colorways: ['black, white, grey']}, 
          { name: 'Product 2', price: 20, description: '<p>Description 2</p>', quantity: 10, onSale: false, images: ['/placeholder.svg'], colorways: ['black, white, grey']},
          { name: 'Product 3', price: 30, description: '<p>Description 3</p>', quantity: 10, onSale: false, images: ['/placeholder.svg'], colorways: ['black, white, grey']}, 
        ],
      });
      console.log('✅ Dummy products created');
    } else {
      console.log('✅ Products already exist, skipping seed');
    }
  }

}
