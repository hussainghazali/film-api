import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './payload.dto';
import { UserDto } from '../user/user.dto';
import { config } from 'dotenv';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Initialize the JWT strategy with the required options
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }

  /**
   * Validates the JWT payload and returns the corresponding user.
   * @param payload The JWT payload.
   * @returns A Promise that resolves to the user associated with the JWT payload.
   * @throws HttpException with status UNAUTHORIZED if the token is invalid or the user is not found.
   */
  async validate(payload: JwtPayload): Promise<UserDto> {
    // Call the validateUser method of the authService to validate the user
    const user = await this.authService.validateUser(payload);

    if (!user) {
      // If the user is not found, throw an HttpException with status UNAUTHORIZED
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    // Return the user
    return user;
  }
}
