import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}