import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeepPartial } from 'typeorm';
import { Task } from 'src/task/entites/task.entity';

@Injectable()
export class UsersService {
     constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

     ){}
     async create(createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      
      // Assign values from DTO to the user entity
      user.username = createUserDto.username;
      user.userUUID = createUserDto.userUUID ; // Generate a new UUID
      user.email = createUserDto.email;
      user.password = createUserDto.password; // Password will be hashed in the entity

      // Save the user to the database
      return await this.userRepository.save(user);
  }
      findAllTasksByUserId(TaskId){
        return this.userRepository.find({
            where:{
                TaskId:{ id:TaskId },
            }
        })
      }
      findOne(id: number) {
        return this.userRepository.findOneBy({ id });
      }
      async createUsertasks(id:string,CreataDto:CreateTaskDto){
        const userId = parseInt(id, 10);
    
        const user = await this.userRepository.findOne({
            where: { id: userId } 
        });
          if(!user)
          throw new HttpException(
            'User not found .Cannot create Proflile',
            HttpStatus.BAD_REQUEST,
        );
        const newTask=this.taskRepository.create({
          ...CreataDto
        });
        const savePost=await this.taskRepository.save(newTask);
        return savePost;

        
      }
    /*  async findAllTasksByUserId(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { userId } }); 
      }*/

    
    
      remove(id: number) {
        return this.userRepository.delete(id);
      }

      update({ id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto; }) {
        const updateData: DeepPartial<User> = {
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
        };
        return this.userRepository.update(+id, updateUserDto);
    }
      

}


