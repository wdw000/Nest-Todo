import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LoginTokenDto } from './dto/loginToken.dto';
import { LoginService } from './login.service';

@Controller('todo/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  loginToken(@Body() token: LoginTokenDto) {
    return this.loginService.loginToken(token);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.loginService.deleteUser(id);
  }
}
