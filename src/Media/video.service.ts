import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3 } from "aws-sdk";
import { InjectAwsService } from "nest-aws-sdk";
import { Repository } from "typeorm";
import { Video } from "./entites/video";

@Injectable()
export class VideoService {
    constructor( @InjectRepository(Video) private teamsRepository: Repository<Video>,
    @InjectAwsService(S3) private readonly s3: S3,){}


    async upload(file: Express.Multer.File):Promise<void>{
        const params = {
            Bucket: BUCKET_NAME,
            Key: OBJECT_KEY,
            Body: file.stream,
            ACL: 'public-read',
            ContentType: file.mimetype
        };
        
        const options = {
            partSize: 10 * 1024 * 1024,
                // how many concurrent uploads
            queueSize: 5
        };
        
        try {
            await this.s3.upload(params, options).promise();
            console.log('upload OK', file.filename);
        } catch (error) {
            console.log('upload ERROR', file.filename, error);
        }

    }
   

}