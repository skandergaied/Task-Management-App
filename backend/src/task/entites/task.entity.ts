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
 // @Column({ type: 'timestamp', nullable: true })
 // userid:number;

  @CreateDateColumn()
  createdAt: Date;  

  @UpdateDateColumn()
  updatedAt: Date; 
  @ManyToOne(() => User, (user) => user.tasks)
  user: User; 
 
}
