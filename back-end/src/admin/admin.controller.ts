import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() body: { username: string; name?: string; password: string }) {
    const admin = await this.adminService.create(body);
    const { password, ...result } = admin;
    return result;
  }
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.adminService.findOneByUsername(username);
  }
}
