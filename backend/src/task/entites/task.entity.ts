import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entites/user.entity';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;  
  @Column('text')
  description: string;  
  @Column({ default: 'Pending' })
  status: string;  

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;  

  @ManyToOne(type => User, user => user.task )
   user: User[];
  @CreateDateColumn()
  createdAt: Date;  

  @UpdateDateColumn()
  updatedAt: Date;  
 
}
