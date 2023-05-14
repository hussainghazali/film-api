import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the user.', example: '1' })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The date when the user was created.',
    example: '2023-05-14T10:00:00Z',
    required: false,
  })
  createdOn?: Date;
}
