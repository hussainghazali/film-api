import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../user/user.create.dto';
import { RegistrationStatus } from './regisration-status.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './login-status.dto';
import { LoginUserDto } from '../user/user-login.dto';
import { JwtPayload } from './payload.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User Registration' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Get Current User' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current authenticated user',
    type: JwtPayload,
  })
  @UseGuards(AuthGuard())
  @Get('whoami')
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
