import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './user.create.dto';
import { LoginUserDto } from './user-login.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  private toUserDto(user: UserEntity): UserDto {
    return plainToClass(UserDto, user);
  }

  async findOne(options?: Partial<UserEntity>): Promise<UserDto> {
    const { hashPassword, ...searchOptions } = options || {};
  
    const findOptions: FindOneOptions<UserEntity> = {
      where: searchOptions,
    };
  
    const user = await this.userRepo.findOne(findOptions);
    return this.toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = compareSync(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.toUserDto(user);
  }

  async findByPayload({ username }: { username: string }): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });
    return this.toUserDto(user);
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepo.create({
      username,
      password,
      email,
    });

    await this.userRepo.save(user);

    return this.toUserDto(user);
  }

  private sanitizeUser(user: UserEntity): UserEntity {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser as UserEntity;
  }
}
