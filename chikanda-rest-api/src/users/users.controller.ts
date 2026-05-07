import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './users.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /api/v1/users
  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      count: users.length,
      data: users,
    });
  }

  // GET /api/v1/users/:id
  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const user = this.userService.findOne(Number(id));
    return res.status(HttpStatus.OK).json({ success: true, data: user });
  }

  // POST /api/v1/users
  @Post()
  async createUser(@Body() body: any, @Res() res: Response) {
    const newUser = this.userService.create(body);
    return res.status(HttpStatus.CREATED).json({ success: true, data: newUser });
  }

  // PUT /api/v1/users/:id
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    const updatedUser = this.userService.update(Number(id), body);
    return res.status(HttpStatus.OK).json({ success: true, data: updatedUser });
  }

  // DELETE /api/v1/users/:id
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    this.userService.remove(Number(id));
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User deleted successfully'
    });
  }
}