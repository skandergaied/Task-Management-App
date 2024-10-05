import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Task } from 'src/task/entites/task.entity';
@Module({
  controllers:[UserController],
  providers:[UsersService],
  imports: [TypeOrmModule.forFeature([User,Task])],
  exports:[UsersService]
})
export class UsersModule {
   
}
 