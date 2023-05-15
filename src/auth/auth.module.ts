import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Import the UsersModule to access user-related functionality
    PassportModule.register({
      defaultStrategy: 'jwt', // Set the default passport strategy to 'jwt'
      property: 'user', // Set the user property name on the Request object
      session: false, // Disable session support
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY, // Set the secret key used for JWT signing
      signOptions: {
        expiresIn: process.env.EXPIRESIN, // Set the expiration time for JWT tokens
      },
    }),
  ],
  controllers: [AuthController], // Declare the AuthController as a part of this module
  providers: [AuthService, JwtStrategy], // Declare the AuthService and JwtStrategy as providers
  exports: [PassportModule, JwtModule], // Export PassportModule and JwtModule for reusability
})
export class AuthModule {}
