import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jose from 'jose';
import { Todos } from 'src/entitty/todo.entity';
import { User } from 'src/entitty/user.entity';
import { Repository } from 'typeorm';
import { LoginTokenDto } from './dto/loginToken.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  private async saveUser(
    uid: string,
    email: string,
    name: string,
    picture: string,
  ) {
    const user = new User();
    user.uid = uid;
    user.email = email;
    user.name = name;
    user.picture = picture;
    const result = await this.usersRepository.save(user);

    return result;
  }

  private async removeUser(id: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('uid = :id', { id: id })
      .execute();
  }

  private async removeUserTodo(id: string) {
    return await this.todosRepository
      .createQueryBuilder()
      .delete()
      .from(Todos)
      .where('userUid = :id', { id: id })
      .execute();
  }

  async loginToken(token: LoginTokenDto) {
    const claims: any = jose.decodeJwt(token.jwt);

    const result = await this.saveUser(
      claims.sub,
      claims.email,
      claims.name,
      claims.picture,
    );
    return result;
  }

  async findUser(uid: string) {
    const user: User = await this.usersRepository.findOne({
      where: {
        uid: uid,
      },
    });

    return user;
  }

  async deleteUser(id: string) {
    if (await this.findUser(id)) {
      const deleteTodos = await this.removeUserTodo(id);
      if (deleteTodos) {
        await this.removeUser(id);
      }
    } else {
      throw new BadRequestException();
    }
  }
}
