import { ApiProperty } from '@nestjs/swagger';

export class LoginStatus {
  @ApiProperty({ description: 'The username of the logged-in user.' })
  username: string;

  @ApiProperty({
    description: 'The access token generated for the logged-in user.',
  })
  accessToken: any;

  @ApiProperty({ description: 'The expiration time of the access token.' })
  expiresIn: any;
}
