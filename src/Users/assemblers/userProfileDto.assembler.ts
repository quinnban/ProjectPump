import { Injectable } from "@nestjs/common";
import { UserProfile } from "../entities/userProfile.entity";
import { UserProfileDto } from "../models/userProfileDto";

@Injectable()
export class UserProfileDtoAssembler {


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
       
        const team = await user.team;
        if(team){
            profile.teamId = team.id;
        }
        return Promise.resolve(profile);
    }

    disassembleInto(from : UserProfileDto, to: UserProfile): UserProfile {
        to.firstName = from.lastName;
        to.lastName = from.lastName;
        to.pictureURl = from.pictureURl;
        
        return to;
    }
}