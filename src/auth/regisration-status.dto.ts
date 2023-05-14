import { ApiProperty } from '@nestjs/swagger';

export class RegistrationStatus {
  @ApiProperty({ description: 'Indicates if the registration was successful.' })
  success: boolean;

  @ApiProperty({
    description: 'The message associated with the registration status.',
  })
  message: string;
}
