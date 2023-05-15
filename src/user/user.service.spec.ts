import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './user.create.dto';
import { UserDto } from './user.dto';
import { LoginUserDto } from './user-login.dto';
import { plainToClass } from 'class-transformer';
import { compareSync } from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: Repository,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(Repository);
  });

  describe('findOne', () => {
    it('should find a user by options', async () => {
      const options = { username: 'testuser' };
      const userEntity = new UserEntity();
      const userDto = new UserDto();

      jest.spyOn(repository, 'findOne').mockResolvedValue(userEntity);
      jest.spyOn(service, 'toUserDto').mockReturnValue(userDto);

      const result = await service.findOne(options);

      expect(repository.findOne).toHaveBeenCalledWith(options);
      expect(service.toUserDto).toHaveBeenCalledWith(userEntity);
      expect(result).toBe(userDto);
    });
  });

  describe('findByLogin', () => {
    it('should find a user by login credentials', async () => {
      const loginUserDto: LoginUserDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      const userEntity = new UserEntity();
      const userDto = new UserDto();

      jest.spyOn(repository, 'findOne').mockResolvedValue(userEntity);
      jest.spyOn(compareSync, 'compareSync').mockReturnValue(true);
      jest.spyOn(service, 'toUserDto').mockReturnValue(userDto);

      const result = await service.findByLogin(loginUserDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: loginUserDto.username },
      });
      expect(compareSync).toHaveBeenCalledWith(
        loginUserDto.password,
        userEntity.password,
      );
      expect(service.toUserDto).toHaveBeenCalledWith(userEntity);
      expect(result).toBe(userDto);
    });

    it('should throw an Unauthorized exception if user is not found', async () => {
      const loginUserDto: LoginUserDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByLogin(loginUserDto)).rejects.toThrowError(
        new HttpException('User not found', HttpStatus.UNAUTHORIZED),
      );
    });

    it('should throw an Unauthorized exception if credentials are invalid', async () => {
      const loginUserDto: LoginUserDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      const userEntity = new UserEntity();

      jest.spyOn(repository, 'findOne').mockResolvedValue(userEntity);
      jest.spyOn(compareSync, 'compareSync').mockReturnValue(false);

      await expect(service.findByLogin(loginUserDto)).rejects.toThrowError(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('findByPayload', () => {
    it('should find a user by payload', async () => {
      const payload = { username: 'testuser' };
      const userEntity = new UserEntity();
      const userDto = new UserDto();

      jest.spyOn(repository, 'findOne').mockResolvedValue(userEntity);
      jest.spyOn(service, 'toUserDto').mockReturnValue(userDto);

      const result = await service.findByPayload(payload);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: payload.username },
      });
      expect(service.toUserDto).toHaveBeenCalledWith(userEntity);
      expect(result).toBe(userDto);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };
      const userEntity = new UserEntity();

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(userEntity);
      jest.spyOn(repository, 'save').mockResolvedValue(userEntity);

      const result = await service.create(createUserDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { username: createUserDto.username },
      });
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(userEntity);
      expect(result).toBe(userEntity);
    });

    it('should throw a BadRequest exception if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };
      const userEntity = new UserEntity();

      jest.spyOn(repository, 'findOne').mockResolvedValue(userEntity);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        new HttpException('User already exists', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('sanitizeUser', () => {
    it('should sanitize user by removing password field', () => {
      const userEntity = new UserEntity();
      userEntity.username = 'testuser';
      userEntity.password = 'testpassword';

      const sanitizedUser = service.sanitizeUser(userEntity);

      expect(sanitizedUser.username).toBe(userEntity.username);
      expect(sanitizedUser.password).toBeUndefined();
    });
  });
});
