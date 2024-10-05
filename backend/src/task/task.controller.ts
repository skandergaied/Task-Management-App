import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { TaskService } from './task.service';
@Controller('task')
export class TaskController {
    constructor(private readonly tasksService: TaskService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        
      return this.tasksService.create(createTaskDto);
    }
}
