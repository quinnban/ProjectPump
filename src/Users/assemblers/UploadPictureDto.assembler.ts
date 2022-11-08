import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { UploadPictureDto } from "../models/uploadProfilePictureDto";

@Injectable()
export class UploadPictureDtoAssembler {
    
    assemble(id:string, responce: S3.PresignedPost): UploadPictureDto{
     const  picture = new UploadPictureDto();
     picture.id = id;
     picture.url =responce.url;
     picture.signature = responce.fields['X-Amz-Signature'];
     picture.algorithm = responce.fields['X-Amz-Algorithm'];
     picture.credential = responce.fields['X-Amz-Credential'];
     picture.date = responce.fields['X-Amz-Date'];
     picture.bucket = responce.fields['bucket'];
     picture.policy = responce.fields['Policy'];
     picture.content = responce.fields['Content-Type'];
     return picture;
    }
}