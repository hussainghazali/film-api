import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RatingEntity } from './rating.entity';
import { Film } from '../films/films.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    // Register TypeORM entities for dependency injection and database integration
    TypeOrmModule.forFeature([RatingEntity, Film, UserEntity]),
    // Configure PassportModule for JWT authentication
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    // Configure JwtModule for token generation and verification
    JwtModule.register({
      secret: process.env.SECRETKEY, // Set the secret key from environment variables
      signOptions: {
        expiresIn: process.env.EXPIRESIN, // Set the token expiration time from environment variables
      },
    }),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
