import { Injectable } from "@nestjs/common";
import { UserProfile } from "../entities/userProfile.entity";
import { UserProfileDto } from "../models/userProfileDto";

@Injectable()
export class UserProfileDtoAssembler {


    assembleMany(users : UserProfile []){
        const profiles = [];
        users.forEach(user => {
            profiles.push(this.assemble(user))
        });
        return profiles;
    }

    async assemble(user: UserProfile): Promise<UserProfileDto> {
        const profile = new UserProfileDto();
        profile.firstName = user.firstName;
        profile.lastName = user.lastName;
        profile.pictureURl = user.pictureURl;
        profile.id = profile.id;
       
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