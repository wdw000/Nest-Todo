import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodo } from './dto/updateTodo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':uid')
  userAllTodos(@Param('uid') uid: string) {
    return this.todoService.findUserAllTodos(uid);
  }

  @Post()
  create(@Body() data: AddTodoDto) {
    return this.todoService.addNewTodo(data);
  }

  @Put()
  updateTodo(@Body() data: UpdateTodo) {
    return this.todoService.updateTodo(data);
  }

  @Put(':id')
  updateTodoCompleted(@Param('id') id: string) {
    return this.todoService.updateTodoCompleted(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @Delete('/user/:uid')
  deleteAllTodo(@Param('uid') uid: string) {
    return this.todoService.deleteAllTodo(uid);
  }
}
