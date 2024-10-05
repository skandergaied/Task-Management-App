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
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UsersService) {}
    @Post()
    create(@Body()CreateUserDto:CreateUserDto){
      return this.userService.create(CreateUserDto);
    }
    @Get()
   // @UseGuards(AuthGuard)
    findOne(@Param('id') id:string) {
      return this.userService.findOne(+id);
    }
    

    @Get('/task/:taskid')
   // @UseGuards(AuthGuard)
    findAll(@Param('taskid') taskid:number) {
      return this.userService.findAllUserByTaskId(taskid);
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