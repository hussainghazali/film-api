import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user.',
    example: 'password123',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john@example.com',
  })
  email: string;
}
