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

import { AwsSdkModule } from 'nest-aws-sdk';
import {  S3, Credentials } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { UserService } from './Users/user.service';
import { TeamService } from './Teams/team.service';
import { Config } from 'awsConfig';


const entities = [
  User,
  Team,
  UserProfile
];


@Module({
  imports: [
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-east-1',
        credentials: new Credentials({accessKeyId:Config.id,secretAccessKey:Config.secret})
        
        },
      services: [S3],
    }),
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
  providers: [
    AppService,
    // UserService,
    // TeamService,
    // UpdateUserProfileDtoAssembler,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})
export class AppModule {}

