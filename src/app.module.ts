import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
