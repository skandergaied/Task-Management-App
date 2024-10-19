import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {  CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entites/task.entity';
import { User} from 'src/users/entites/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskdDto } from './dto/update-task.dto';
@Injectable()
export class TaskService {
     constructor(
        @InjectRepository(Task)
        private taskRepository:Repository<Task>,

     ){}
     
      async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();
        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.status = createTaskDto.status;
        task.dueDate = createTaskDto.dueDate;
        task.user = user; 
    
        return await this.taskRepository.save(task);
    }
    
     findOne(id: number) {
        return this.taskRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
        await this.taskRepository.remove(task); 
      }
  
        async updateTask(id: number, updateTaskDto: UpdateTaskdDto): Promise<Task> {
          const task = await this.taskRepository.findOneBy({ id });
      
          if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
          }
      
          Object.assign(task, updateTaskDto); 
      
          task.updatedAt = new Date(); 
          return this.taskRepository.save(task); 
        }
      

}


