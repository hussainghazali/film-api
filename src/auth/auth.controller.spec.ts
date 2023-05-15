import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.create.dto';
import { RegistrationStatus } from './regisration-status.dto';
import { LoginUserDto } from '../user/user-login.dto';
import { LoginStatus } from './login-status.dto';
import { JwtPayload } from './payload.dto';
import { HttpStatus, HttpException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        // Provide valid create user data for testing
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };

      const registrationStatus: RegistrationStatus = {
        success: true,
        message: 'User registered successfully',
      };

      jest.spyOn(authService, 'register');

      const result = await authController.register(createUserDto);

      expect(result).toEqual(registrationStatus);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an exception if registration fails', async () => {
      const createUserDto: CreateUserDto = {
        // Provide invalid create user data for testing
        username: 'invaliduser',
        password: 'invalidpassword',
        email: 'invalidemail',
      };

      const registrationStatus: RegistrationStatus = {
        success: false,
        message: 'Registration failed',
      };

      jest.spyOn(authService, 'register');

      // Assert that registration throws an exception with the appropriate message and status code
      await expect(authController.register(createUserDto)).rejects.toThrow(
        new HttpException(registrationStatus.message, HttpStatus.BAD_REQUEST),
      );

      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should perform user login', async () => {
      const loginUserDto: LoginUserDto = {
        // Provide valid login user data for testing
        username: 'testuser',
        password: 'testpassword',
      };

      const loginStatus: LoginStatus = {
        accessToken: 'testaccesstoken',
        username: 'testuser',
        expiresIn: '7200s',
        id: '',
      };

      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => loginStatus);

      const result = await authController.login(loginUserDto);

      expect(result).toEqual(loginStatus);
      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });

  describe('testAuth', () => {
    it('should return the authenticated user', async () => {
      const req = { user: { username: 'testuser' } };
      const expectedUser: JwtPayload = { username: 'testuser' };

      const result = await authController.testAuth(req);

      expect(result).toEqual(expectedUser);
    });
  });
});
