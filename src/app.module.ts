import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';
import { FilmsModule } from './films/films.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions), // Configure TypeORM with the provided data source options
    AuthModule, // Import the AuthModule
    FilmsModule, // Import the FilmsModule
    UsersModule, // Import the UsersModule
    RatingModule, // Import the RatingModule
    SearchModule, // Import the SearchModule
  ],
  controllers: [AppController], // Declare the AppController
  providers: [AppService], // Declare the AppService
})
export class AppModule {}
