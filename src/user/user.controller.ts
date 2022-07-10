import { Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id == 'all') {
        const result = await this.userService.getAll();
        return res.status(200).send([...result]);
      } else {
        const result = await this.userService.get(id);
        return res.status(200).send({ ...result });
      }
    } catch (err) {
      return res.status(500).send({ message: 'Cannot get', statuseCode: 500 });
    }
  }

  @Post('')
  async create(@Req() req, @Res() res: Response) {
    try {
      const result = await this.userService.register(
        req.body.email,
        req.body.password,
        req.body.photoUrl
          ? req.body.photoUrl
          : 'https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-hoat-hinh-de-thuong-1.jpg',
      );
      return res.status(200).send(result);
    } catch {
      return res
        .status(500)
        .send({ message: 'Cannot create', statuseCode: 500 });
    }
  }
  @Put()
  async update(@Req() req, @Res() res: Response) {
    try {
      const id = req.body.id;
      if (!id) {
        return res
          .status(400)
          .send({ message: 'Id is required', statusCode: 400 });
      }
      const result = await this.userService.update(id, req.body);
      return res.status(200).send(result);
    } catch {
      return res
        .status(500)
        .send({ message: 'Cannot update', statuseCode: 500 });
    }
  }
}
