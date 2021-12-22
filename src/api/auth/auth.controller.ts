import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {

  constructor(private authService: AuthService) { }


  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  async register(@Body() user: RegisterDto) {
    await this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@Req() req) {
    console.log(req.user);

  }
}
