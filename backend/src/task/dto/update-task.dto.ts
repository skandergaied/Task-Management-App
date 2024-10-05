import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskdDto } from './create-task.dto';

export class UpdateTaskdDto extends PartialType(CreateTaskdDto) {}