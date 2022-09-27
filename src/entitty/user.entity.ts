import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Todos } from './todo.entity';

@Entity()
export class User {
  @PrimaryColumn('char', { length: 30 })
  uid: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 100 })
  picture: string;

  @OneToMany(() => Todos, (todo) => todo.user)
  todos: Todos[];
}
