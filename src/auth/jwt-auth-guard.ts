import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Handles the request during the authentication process.
   * @param err The error that occurred during authentication (if any).
   * @param user The authenticated user (if authentication was successful).
   * @param info Additional authentication information.
   * @param context The current execution context.
   * @returns The authenticated user.
   * @throws UnauthorizedException if an error occurred during authentication or if the user is not authenticated.
   */
  handleRequest(err, user, info, context) {
    if (err || !user) {
      // If an error occurred during authentication or if the user is not authenticated,
      // throw an UnauthorizedException
      throw err || new UnauthorizedException();
    }
    // Return the authenticated user
    return user;
  }
}
