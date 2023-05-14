import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty({ description: 'The username associated with the JWT payload.' })
  username: string;
}
