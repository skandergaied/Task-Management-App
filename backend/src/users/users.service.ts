import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeepPartial } from 'typeorm';
import { Task } from 'src/task/entites/task.entity';
import { RegisterDto} from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
     constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

     ){}
   /*  async create(createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = createUserDto.password; 
      console.log(user.password);
      return await this.userRepository.save(user);
  }*/
      create(createUserDto: RegisterDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.password = createUserDto.password; // Password gets hashed in the entity
        return this.userRepository.save(user);
      }
   /*   findAllTasksByUserId(TaskId){
        return this.userRepository.find({
            where: { TaskId: TaskId }, 
        })
      }*/
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
        const newTask = this.taskRepository.create({
          ...CreataDto, // Ensure proper spreading of data from DTO
          user, // Associate with the user
        });
        const savedTask = await this.taskRepository.save(newTask);
        return savedTask;

        
      }    
      remove(id: number) {
        return this.userRepository.delete(id);
      }

      update({ id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto; }) {
        const updateData: DeepPartial<User> = {
            username:updateUserDto.username
           
        };
        return this.userRepository.update(+id, updateUserDto);
    }
      

}


