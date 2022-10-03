import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './Users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Users/entities/user';



@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'admin',
      password: 'admin',
      database: 'workout',
      entities: [User],
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})
export class AppModule {}
