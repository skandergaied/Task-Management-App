import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entites/user.entity';
import { Task } from './task/entites/task.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
     UsersModule, TaskModule
    ,TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",  
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_gs_tma',
      entities: [User, Task],
    synchronize: process.env.ENV !== 'production',
    // synchronize: false,
    }), AuthModule
    ],
  controllers: [AppController],
  providers: [AppService,AuthGuard]
})
export class AppModule {}
