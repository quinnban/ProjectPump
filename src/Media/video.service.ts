import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "./entites/video";

@Injectable()
export class VideoService {
    constructor( @InjectRepository(Video) private teamsRepository: Repository<Video>){}

}