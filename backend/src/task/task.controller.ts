import { Controller, Post, Body, UseGuards,Delete,Param,Put ,Request, Get,NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { UpdateTaskdDto } from './dto/update-task.dto';
import { Task } from './entites/task.entity';
import { User } from 'src/users/entites/user.entity';
@Controller('task')
export class TaskController {
    constructor(private readonly tasksService: TaskService) {}

   // @Post()
   // @UseGuards(AuthGuard)
   // create(@Body() createTaskDto: CreateTaskDto) {
        
    //  return this.tasksService.create(createTaskDto);
   // }

  @Post()
   //@UseGuards(AuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const user: User = req.user; 
    console.log(req.user);
    return this.tasksService.createTask(createTaskDto, user);
}
   

//@UseGuards(AuthGuard)
    @Delete(':id/delete')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
@Put(':id')
//@UseGuards(AuthGuard)
async updateTask(
  @Param('id') id: number,
  @Body() updateTaskDto: UpdateTaskdDto
) {
  return this.tasksService.updateTask(id, updateTaskDto);
}

}
