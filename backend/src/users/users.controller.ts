import { UsersService } from './users.service'; 
import { UpdateUserDto } from './dto/update-user.dto';
import {
    Controller,
    Get,
    Body,
    Patch,
    Delete,
    Request,
    Param,
    Post

  } from '@nestjs/common';   
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UsersService) {}
    @Post()
    create(@Body()CreateUserDto:CreateUserDto){
      return this.userService.create(CreateUserDto);
    }
    
    @Post(':id/tasks')
    async createUserTasks(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
      return await this.userService.createUsertasks(id, createTaskDto);
    }


  
  /*  @Get()
   // @UseGuards(AuthGuard)
    findOne(@Param('id') id:string) {
      return this.userService.findOne(+id);
    }*/
   /* @Get('/task/:taskid')
   // @UseGuards(AuthGuard)
    findAll(@Param('taskid') taskid:number) {
      return this.userService.findAllUserByTaskId(taskid);
    }*/
      @Get(':id') // Changed to use :id for fetching a specific user
      findOne(@Param('id') id: string) {
          return this.userService.findOne(+id);
      }
  
      @Get(':id/tasks') // New endpoint to get all tasks for a user
      findAllTasks(@Param('id') userId: string) {
          return this.userService.findAllTasksByUserId(+userId);
      }
  
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update({ id: +id, updateUserDto });
    }
  
    @Delete(':id')
  //  @UseGuards(AuthGuard)
    remove(@Param('id') id: String) {
      return this.userService.remove(+id);
    }
  }