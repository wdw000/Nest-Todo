import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from 'src/entitty/todo.entity';
import { User } from 'src/entitty/user.entity';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodo } from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async saveTodo(
    useruid: string,
    content: string,
    endDate: string,
    startDate: string,
    important: boolean,
  ) {
    const user = new User();
    user.uid = useruid;
    await this.usersRepository.manager.save(user);

    const todos = new Todos();
    todos.content = content;
    todos.end_date = endDate;
    todos.important = important;
    todos.start_date = startDate;
    todos.user = user;
    const result = await this.todosRepository.manager.save(todos);

    return result;
  }

  private async findAllTodos(uid: string) {
    const result = await this.todosRepository.find({
      where: {
        user: uid,
      },
    });
    return result;
  }

  private async update(
    todoId: string,
    content: string,
    endDate: string,
    important: boolean,
  ) {
    await this.todosRepository
      .createQueryBuilder()
      .update(Todos)
      .set({
        content: content,
        end_date: endDate,
        important: important,
      })
      .where('id = :id', { id: todoId })
      .execute();
  }

  private async delete(id: string) {
    await this.todosRepository
      .createQueryBuilder()
      .delete()
      .from(Todos)
      .where('id = :id', { id: id })
      .execute();
  }

  private async deleteAll(uid: string) {
    await this.todosRepository
      .createQueryBuilder()
      .delete()
      .from(Todos)
      .where('userUid =  :id', { id: uid })
      .execute();
  }

  private async updateCompleted(id: string) {
    await this.todosRepository
      .createQueryBuilder()
      .update(Todos)
      .set({
        completed: () => '!completed',
      })
      .where('id = :id', { id: id })
      .execute();
  }

  private async findTodo(id: string) {
    const todo = await this.todosRepository.findOne({
      where: {
        id: id,
      },
    });

    return todo;
  }

  private async findUser(uid: string) {
    const user = await this.usersRepository.findOne({
      where: {
        uid: uid,
      },
    });

    return user;
  }

  async addNewTodo(data: AddTodoDto) {
    const result = await this.saveTodo(
      data.uid,
      data.content,
      data.end_date,
      data.startDate,
      data.important,
    );

    return result;
  }

  async findUserAllTodos(uid: string) {
    const result = await this.findAllTodos(uid);

    return result;
  }

  async updateTodo(data: UpdateTodo) {
    const result = await this.update(
      data.todoId,
      data.content,
      data.endDate,
      data.important,
    );
    console.log(result);
  }

  async deleteTodo(id: string) {
    if (await this.findTodo(id)) {
      await this.delete(id);
    } else {
      throw new BadRequestException();
    }
  }

  async updateTodoCompleted(id: string) {
    if (await this.findTodo(id)) {
      await this.updateCompleted(id);
    } else {
      throw new BadRequestException();
    }
  }

  async deleteAllTodo(uid: string) {
    if (await this.findUser(uid)) {
      await this.deleteAll(uid);
    } else {
      throw new BadRequestException();
    }
  }
}
