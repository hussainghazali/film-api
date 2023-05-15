import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  // Import the TypeOrmModule to provide access to the UserEntity repository
  imports: [TypeOrmModule.forFeature([UserEntity]), RatingModule],
  // Provide the UsersService as a provider within this module
  providers: [UsersService],
  // Export the UsersService to make it available for other modules that import this module
  exports: [UsersService],
})
export class UsersModule {}
