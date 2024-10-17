import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { InternalServerErrorException } from '@nestjs/common';
@Controller('auth') 
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
async create(@Body() registerDto: RegisterDto) {
  try {
    registerDto.email = registerDto.email.toLowerCase();
    const user = await this.userService.create(registerDto);
    if (!user) {
      throw new BadRequestException('Unable to register');
    }
    return this.authService.login({
      email: user.email,
      password: registerDto.password,
    });
  } catch (error) {
    console.error('Registration error:', error); 
    throw new InternalServerErrorException('An error occurred during registration');
  }
}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}