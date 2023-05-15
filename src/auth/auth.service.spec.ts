import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/user.create.dto';
import { RegistrationStatus } from './regisration-status.dto';
import { HttpStatus, HttpException } from '@nestjs/common';
import { LoginUserDto } from '../user/user-login.dto';
import { LoginStatus } from './login-status.dto';
import { UserDto } from '../user/user.dto';
import { JwtPayload } from './payload.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByLogin: jest.fn(),
            findByPayload: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        // Provide valid create user data for testing
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };

      const user: UserDto = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      };

      const registrationStatus: RegistrationStatus & { user: UserDto } = {
        success: true,
        message: 'User registered',
        user,
      };

      jest.spyOn(usersService, 'create');

      const result = await authService.register(createUserDto);

      expect(result).toEqual(registrationStatus);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an exception if registration fails', async () => {
      const createUserDto: CreateUserDto = {
        // Provide invalid create user data for testing
        username: 'invaliduser',
        password: 'invalidpassword',
        email: 'invalidemail',
      };

      const errorMessage = 'Registration failed';

      jest.spyOn(usersService, 'create').mockRejectedValue(errorMessage);

      await expect(authService.register(createUserDto)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
      );
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should perform user login', async () => {
      const loginUserDto: LoginUserDto = {
        // Provide valid login user data for testing
        username: 'testuser',
        password: 'testpassword',
      };

      const user: UserDto = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      };

      const token = {
        expiresIn: '7200s',
        accessToken: 'testaccesstoken',
      };

      const loginStatus: LoginStatus = {
        id: '1',
        username: 'testuser',
        ...token,
      };

      jest.spyOn(usersService, 'findByLogin').mockResolvedValue(user);
      jest.spyOn(authService, 'createToken').mockReturnValue(token);

      const result = await authService.login(loginUserDto);

      expect(result).toEqual(loginStatus);
      expect(usersService.findByLogin).toHaveBeenCalledWith(loginUserDto);
      expect(authService.createToken).toHaveBeenCalledWith(user);
    });
  });

  describe('validateUser', () => {
    it('should validate a user based on the JWT payload', async () => {
      const payload: JwtPayload = {
        username: 'testuser',
      };

      const user: UserDto = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      };

      jest.spyOn(usersService, 'findByPayload').mockResolvedValue(user);

      const result = await authService.validateUser(payload);

      expect(result).toEqual(user);
      expect(usersService.findByPayload).toHaveBeenCalledWith(payload);
    });

    it('should throw an exception if user validation fails', async () => {
      const payload: JwtPayload = {
        username: 'testuser',
      };

      jest.spyOn(usersService, 'findByPayload').mockResolvedValue(null);

      await expect(authService.validateUser(payload)).rejects.toThrow(
        new HttpException('Invalid token', HttpStatus.UNAUTHORIZED),
      );
      expect(usersService.findByPayload).toHaveBeenCalledWith(payload);
    });
  });

  describe('createToken', () => {
    it('should create a JWT token for the user', () => {
      const user: UserDto = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      };

      const token = {
        expiresIn: '7200s',
        accessToken: 'testaccesstoken',
      };

      jest.spyOn(jwtService, 'sign').mockReturnValue(token.accessToken);

      const result = authService.createToken(user);

      expect(result).toEqual(token);
      expect(jwtService.sign).toHaveBeenCalledWith({ username: user.username });
    });
  });
});
