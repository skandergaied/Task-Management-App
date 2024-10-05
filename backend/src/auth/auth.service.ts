import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Registerdto } from './dto/register.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entites/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  )
  {}
  async login(createAuthDto: LoginDto) {
    const user =await this.UserRepository.findOne({
      where:{email:createAuthDto.email}
    }) 
    if(!user){
      throw new NotFoundException('user not found');
    }
    if(!bcrypt.compareSync(createAuthDto.password,user.Password)){
      throw new BadRequestException('Invalid login details');
    }
    const payload = {email:user.email,id:user.id};

    return {
      accessToken : await this.JwtService.signAsync(payload),
    };
    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: Registerdto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
