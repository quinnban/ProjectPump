import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "./entites/photo";
import { Video } from "./entites/video";

@Module({
    imports: [TypeOrmModule.forFeature([Photo,Video])],
    controllers: [],
    providers: [],
    exports:[]
  })

  export class MediaModule {}