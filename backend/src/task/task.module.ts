import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entites/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task])],
  exports:[TaskService]
})
export class TaskModule {}
