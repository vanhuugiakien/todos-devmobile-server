import { Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Req() req, @Res() res: Response) {
    const result = await this.authService.login(
      req.body.email,
      req.body.password,
    );
    res.status(result.statusCode).send(result);
  }
}
