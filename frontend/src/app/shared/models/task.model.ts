import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;  

  @Column('text')
  description!: string; 

  @Column({ default: 'Pending' })
  status!: string;  


  @Column({ type: 'timestamp', nullable: true })
  dueDate!: Date;
}
