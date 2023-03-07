import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthGoogleService } from './authGoogle.service';
import { AuthGoogleController } from './authGoogle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from '../auth/entities/token.entity';
import User from '../user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GoogleStrategy,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token, User]),
  ],
  providers: [AuthGoogleService, GoogleStrategy],
  // controllers: [AuthGoogleController],
})
export default class AuthGoogleModule {}
