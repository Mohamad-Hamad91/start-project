import { Body, Controller, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {

  constructor(private authService: AuthService) { }


  @Post('/register')
  async register(@Body() user: RegisterDto) {
    this.authService.register(user);
  }

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
