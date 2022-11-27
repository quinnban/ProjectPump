import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { InjectAwsService } from "nest-aws-sdk";
import { UserProfile } from "../entities/userProfile.entity";
import { UserProfileDto } from "../models/userProfileDto";
import { UserTeamDtoAssembler } from "./userTeamDto.assembler";

@Injectable()
export class UserProfileDtoAssembler {

    constructor(@InjectAwsService(S3) private readonly s3: S3, private userTeamAssembler: UserTeamDtoAssembler){}

    async assembleMany(users : UserProfile []): Promise<UserProfileDto []>{
        const profiles : UserProfileDto[] = [];
        
       for(const user of users){
            const aUser = await this.assemble(user);
            profiles.push(aUser);
       }
        return Promise.resolve(profiles);
    }

    async assemble(user: UserProfile): Promise<UserProfileDto> {
        const profile = new UserProfileDto();
        profile.firstName = user.firstName;
        profile.lastName = user.lastName;
        profile.pictureURl = user.pictureURl;
        profile.id = user.id;
        if(user.teams){
            profile.teams = this.userTeamAssembler.assembleMany(user.teams)
        }

        if(user.pictureURl){
            const Bucket = "project-pump-dev-pictures";
            const responce = await this.s3.getSignedUrlPromise('getObject',{Bucket,Key:user.pictureURl})
            profile.pictureURl = responce;
        }
        return Promise.resolve(profile);
    }

    disassembleInto(from : UserProfileDto, to: UserProfile): UserProfile {
        to.firstName = from.firstName;
        to.lastName = from.lastName;
        to.pictureURl = from.pictureURl;
        return to;
    }
}