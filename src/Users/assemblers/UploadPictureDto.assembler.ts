import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { UploadPictureDto } from "../models/uploadPictureDto";

@Injectable()
export class UploadPictureDtoAssembler {
    
    assemble(id:string, response: S3.PresignedPost): UploadPictureDto{
     const  picture = new UploadPictureDto();
     picture.id = id;
     picture.url =response.url;
     picture.signature = response.fields['X-Amz-Signature'];
     picture.algorithm = response.fields['X-Amz-Algorithm'];
     picture.credential = response.fields['X-Amz-Credential'];
     picture.date = response.fields['X-Amz-Date'];
     picture.bucket = response.fields['bucket'];
     picture.policy = response.fields['Policy'];
     picture.content = response.fields['Content-Type'];
     return picture;
    }
}