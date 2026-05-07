import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { MenuService } from './menu.service';

@Controller('api/v1/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // GET /api/v1/menu
  @Get()
  async getMenu(@Res() res: Response) {
    const items = this.menuService.findAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      data: items,
    });
  }

  // POST /api/v1/menu (Add new food item)
  @Post()
  async createItem(@Body() body: any, @Res() res: Response) {
    const newItem = this.menuService.create(body);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Menu item added successfully',
      data: newItem,
    });
  }

  // PUT /api/v1/menu/:id (Update price or details)
  @Put(':id')
  async updateItem(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    const updated = this.menuService.update(Number(id), body);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: updated,
    });
  }

  // DELETE /api/v1/menu/:id
  @Delete(':id')
  async deleteItem(@Param('id') id: string, @Res() res: Response) {
    this.menuService.remove(Number(id));
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Item removed from menu'
    });
  }
}