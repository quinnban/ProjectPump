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
import { Config } from 'awsConfig';
import { Exercise } from './Exercises/entities/exercise.entity';
import { WorkoutExercise } from './Exercises/entities/workOutExerciseReps.entity';
import { Workout } from './Workouts/entites/workout.entity';
import { ExerciseModule } from './Exercises/exersice.module';
import { WorkoutModule } from './Workouts/workout.module';


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
      entities:[User,Team,UserProfile,Exercise,WorkoutExercise,Workout],
      synchronize: true,
      logging: true
    }),
    TeamModule,
    UserModule,
    ExerciseModule,
    WorkoutModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})
export class AppModule {}

