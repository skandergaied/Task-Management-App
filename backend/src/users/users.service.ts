import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
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
     create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.password = createUserDto.password;
        return this.userRepository.save(user);
      }
      findAllTasksByUserId(TaskId){
        return this.userRepository.find({
            where:{
                TaskId:{ id:TaskId },
            }
        })
      }
    /*  async findAllTasksByUserId(userId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { userId } }); 
      }*/

     findOne(id: number) {
        return this.userRepository.findOneBy({ id });
      }
    
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


