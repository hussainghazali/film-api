import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user.',
    example: 'password123',
  })
  readonly password: string;
}
