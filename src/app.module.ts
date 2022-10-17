import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './Users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Users/entities/user.entity';
import { TeamModule } from './Teams/team.module';
import { Team } from './Teams/entities/team';
import { UserProfile } from './Users/entities/userProfile.entity';


const entities = [
  User,
  Team,
  UserProfile
];


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'service_user',
      password: 'password',
      database: 'workout',
      entities:[User,Team,UserProfile],
      synchronize: true,
    }),
    UserModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})
export class AppModule {}

