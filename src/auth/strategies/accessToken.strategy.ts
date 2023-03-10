import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_AT_SECRET'),
    });
  }
  
  async validate(validationPayload: {
    email: string;
    id: number;
  }): Promise<any> {
    return {
      email: validationPayload.email,
      id: validationPayload.id,
    };
  }
}
