import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
  ) {}

  findAll() {
    return this.menuRepo.find();
  }

  async findOne(id: number) {
    const item = await this.menuRepo.findOneBy({ id });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  create(dto: CreateMenuDto) {
    const menu = this.menuRepo.create(dto);
    return this.menuRepo.save(menu);
  }

  async update(id: number, dto: UpdateMenuDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.menuRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.menuRepo.remove(item);
  }
}