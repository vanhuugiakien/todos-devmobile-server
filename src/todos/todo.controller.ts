import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Task } from 'src/models/task.model';
import { Todo } from 'src/models/todo.model';
import { TodoService } from './todo.service';
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id == 'all') {
        const result = await this.todoService.getAll();
        console.log(result);
        return res.status(200).send({ data: result, statuseCode: 200 });
      } else {
        const result = await this.todoService.get(id);
        return res.status(200).send({ data: result, statuseCode: 200 });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'Cannot get', statuseCode: 500 });
    }
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const timestamp = new Date().getTime();
      const id = parseInt((timestamp * Math.random()).toString()).toString();
      const body = req.body;
      const newTodo: Todo = {
        id: id,
        name: body.name,
        isDone: false,
        createdDate: timestamp,
        updatedDate: timestamp,
        description: body.description,
        ownerId: body.ownerId,
        participants: body.participants as string[],
        priority: body.priority,
        tasks: body.tasks as Task[],
      };
      const result = await this.todoService.create(newTodo);
      return res.status(200).send({ data: result, statuseCode: 200 });
    } catch {
      return res
        .status(500)
        .send({ message: 'Cannot create', statuseCode: 500 });
    }
  }
  @Put()
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const body = req.body;
      const result = await this.todoService.update(body.id, body);
      return res.status(200).send({ data: result, statuseCode: 200 });
    } catch {
      return res
        .status(500)
        .send({ message: 'Cannot update', statuseCode: 500 });
    }
  }
  @Delete()
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const body = req.body;
      const result = await this.todoService.delete(body.id);
      return res.status(200).send({ data: result, statuseCode: 200 });
    } catch {
      return res
        .status(500)
        .send({ message: 'Cannot delete', statuseCode: 500 });
    }
  }
}
