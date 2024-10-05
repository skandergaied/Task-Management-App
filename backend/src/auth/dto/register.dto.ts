import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';

export class Registerdto extends PartialType(LoginDto) {
    
}
