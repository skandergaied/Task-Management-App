import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {  CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskdDto } from './dto/update-task.dto';
import { Task } from './entites/task.entity';
@Injectable()
export class TaskService {
    create(createTaskDto: CreateTaskDto) {
        throw new Error('Method not implemented.');
    }
}
@Injectable()
export class UsersService {
     constructor(
        @InjectRepository(Task)
        private taskRepository:Repository<Task>,

     ){}
     create(createTaskDto: CreateTaskDto) {
        const task = new Task();
        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.status = createTaskDto.status; 
        task.createdAt=createTaskDto.createdAt;  
        task.updatedAt=createTaskDto.updatedAt;  
        task.dueDate = createTaskDto.dueDate;
        return this.taskRepository.save(task);
      }

     findOne(id: number) {
        return this.taskRepository.findOneBy({ id });
      }
    
      remove(id: number) {
        return this.taskRepository.delete(id);
      }

      async update({ id, upTaskUserDto }: { id: number; upTaskUserDto: UpdateTaskdDto }) {
            
      }
      

}


