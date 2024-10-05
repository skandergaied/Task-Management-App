import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsDate()
    dueDate: Date;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}