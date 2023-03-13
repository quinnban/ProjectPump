import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from "./entites/photo";

@Injectable()
export class PhotoService {
    constructor( @InjectRepository(Photo) private teamsRepository: Repository<Photo>){}

}