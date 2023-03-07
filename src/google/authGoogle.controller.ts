import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGoogleService } from './authGoogle.service';
import { GoogleOauthGuard } from './guards/googleAuth.guard';

@Controller('')
export class AuthGoogleController {
  constructor(private authGoogleService: AuthGoogleService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    console.log('req', req);
    // const token = await this.authGoogleService.signIn(req.user);
    //
    // res.cookie('access_token', token, {
    //   maxAge: 2592000000,
    //   sameSite: true,
    //   secure: false,
    // });

    return res.status(HttpStatus.OK);
  }
}
