
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { User } from 'src/users/entites/user.entity';
export class UpdateTaskdDto extends PartialType(CreateTaskDto) {
  id: number;
  static title: string | (() => string);
  static description: string | (() => string);
  static status: string | (() => string);
  user:User;

}
