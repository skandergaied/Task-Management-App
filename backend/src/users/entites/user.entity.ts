
import { Column, Entity, PrimaryGeneratedColumn,OneToMany,BeforeInsert } from "typeorm";
import { Task } from "src/task/entites/task.entity";
import * as bcrypt from 'bcrypt';
@Entity({ name: 'user' })
export class User {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    userUUID: string;

    @Column()
    email: string;

    @Column()
    Password: string;
  

    @OneToMany(type => Task, task => task.user )
    contacts: Task[];
   
    @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }


}
