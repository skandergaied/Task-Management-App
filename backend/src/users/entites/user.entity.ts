import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Task } from 'src/task/entites/task.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
   password: string;

  // This is the inverse side of the OneToMany relationship
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];  // Define the 'tasks' property to hold the user's tasks

  @BeforeInsert()
async hashPassword() {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

}
