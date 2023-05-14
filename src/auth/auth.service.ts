import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from '../user/user.create.dto';
import { RegistrationStatus } from './regisration-status.dto';
import { UsersService } from '../user/user.service';
import { LoginStatus } from './login-status.dto';
import { LoginUserDto } from '../user/user-login.dto';
import { UserDto } from '../user/user.dto';
import { JwtPayload } from './payload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    userDto: CreateUserDto,
  ): Promise<RegistrationStatus & { user: UserEntity }> {
    try {
      const user = await this.usersService.create(userDto);
      return {
        success: true,
        message: 'User registered',
        user,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = this.createToken(user);
    return {
      id: user.id,
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private createToken({ username }: UserDto): {
    expiresIn: string;
    accessToken: string;
  } {
    const expiresIn = process.env.EXPIRESIN;
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
