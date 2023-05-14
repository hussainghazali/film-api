import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RatingModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}