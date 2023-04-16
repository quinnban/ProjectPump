import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "./entites/photo";
import { Video } from "./entites/video";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";

@Module({
    imports: [TypeOrmModule.forFeature([Photo,Video])],
    controllers: [VideoController],
    providers: [VideoService],
    exports:[VideoService]
  })

  export class MediaModule {}