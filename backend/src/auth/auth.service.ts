import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entites/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

 /* async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
  
    console.log('Retrieved user:', user); 
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    
    if (!user.password) {
      throw new UnauthorizedException('Password not set for user');
    }
    if (!loginDto.password) {
      throw new UnauthorizedException('Password not set for user');
    }
  
    console.log('Login password:', loginDto.password);
    console.log('User password:', user.password);

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid login details');
    }
  
    const payload = { email: user.email, id: user.id };
  
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }*/
    async login(loginDto: LoginDto) {
      const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    
      if (!user) {
        throw new NotFoundException('User not found');
      }
    
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);  // Ensure this works correctly
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid login details');
      }
    
      const payload = { email: user.email, id: user.id };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    
}