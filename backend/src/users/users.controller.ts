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
      UseGuards,
      HttpException,
      HttpStatus

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

        @Get(':id') 
        findOne(@Param('id') id: string) {
            return this.userService.findOne(+id);
        }
    
     
      @Patch(':id')
      update(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update({ id: +id, updateUserDto });
      }
    

      @Delete(':id')
      remove(@Param('id') id: String) {
        return this.userService.remove(+id);
      }
     
      
    @Get(':id/tasks')
    async getUserTasks(@Param('id') id: string) {
        try {
            const tasks = await this.userService.getUserTasks(id);
            console.log(tasks);
            return tasks; 
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    }