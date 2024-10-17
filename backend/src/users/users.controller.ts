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
      Post,
      UseGuards

    } from '@nestjs/common';   

  import { AuthGuard } from 'src/auth/auth/auth.guard';
  import { CreateUserDto } from './dto/create-user.dto';
  import { CreateTaskDto } from 'src/task/dto/create-task.dto';
    @Controller('user')
    export class UserController {
      constructor(private readonly userService: UsersService) {}
    
    
      @Post()
    // @UseGuards(AuthGuard)
      create(@Body()CreateUserDto:CreateUserDto){
        return this.userService.create(CreateUserDto);
  }
  
  @Post(':id/tasks')
  // @UseGuards(AuthGuard)
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
        @Get(':id') 
        findOne(@Param('id') id: string) {
            return this.userService.findOne(+id);
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