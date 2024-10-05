import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entites/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global:true,
    secret:'secretkey',
    signOptions:{expiresIn:'3h'}
  })
]
})
export class AuthModule {}
