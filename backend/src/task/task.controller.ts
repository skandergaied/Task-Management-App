import { Controller, Post, Body, UseGuards,Delete,Param } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('task')
export class TaskController {
    constructor(private readonly tasksService: TaskService) {}

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createTaskDto: CreateTaskDto) {
        
      return this.tasksService.create(createTaskDto);
    }
    @UseGuards(AuthGuard)
    @Delete(':id/delete')
   @UseGuards(AuthGuard)
    async delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
   
  @Put(':id/update')
  @Delete(':id/delete')
   @UseGuards(AuthGuard)
   async update(@Param('id') id: number, @Body() contact: Contact): Promise<void> {
    contact.id = id;
    return this.contactService.update(contact);
  }



}
