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

  /**
   * Registers a new user.
   * @param userDto The DTO containing user registration data.
   * @returns A promise resolving to the registration status and the created user entity.
   * @throws HttpException if user registration fails.
   */
  async register(
    userDto: CreateUserDto,
  ): Promise<RegistrationStatus & { user: UserEntity }> {
    try {
      // Create the user using the UsersService
      const user = await this.usersService.create(userDto);

      return {
        success: true,
        message: 'User registered',
        user,
      };
    } catch (err) {
      // Throw an exception if user registration fails
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Logs in a user.
   * @param loginUserDto The DTO containing user login data.
   * @returns A promise resolving to the login status, including the user ID, username, and access token.
   */
  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // Find the user by login credentials using the UsersService
    const user = await this.usersService.findByLogin(loginUserDto);

    // Create a token for the user
    const token = this.createToken(user);

    return {
      id: user.id,
      username: user.username,
      ...token,
    };
  }

  /**
   * Validates a user based on the provided JWT payload.
   * @param payload The JWT payload containing user information.
   * @returns A promise resolving to the validated user.
   * @throws HttpException if the user is not found.
   */
  async validateUser(payload: JwtPayload): Promise<UserDto> {
    // Find the user by the payload using the UsersService
    const user = await this.usersService.findByPayload(payload);

    if (!user) {
      // Throw an exception if the user is not found
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  /**
   * Creates a JWT access token for a user.
   * @param user The user DTO containing the username.
   * @returns An object with the access token and its expiration time.
   */
  public createToken({ username }: UserDto): {
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
