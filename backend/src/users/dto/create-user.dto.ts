import { IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  username: string;
  userUUID: string; // Ensure this is provided
  email: string;
  password: string; // Ensure this matches the entity property
}
