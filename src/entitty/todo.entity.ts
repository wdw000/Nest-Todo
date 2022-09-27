import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column('boolean', { nullable: true, default: false })
  completed: boolean;

  @Column('boolean', { nullable: true, default: false })
  important: boolean;

  @Column('date')
  end_date: string;

  @Column('date')
  start_date: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
