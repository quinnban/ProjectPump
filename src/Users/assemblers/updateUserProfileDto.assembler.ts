import { Injectable } from "@nestjs/common";
import { UserProfile } from "../entities/userProfile.entity";
import { UpdateUserProfileDto } from "../models/updateUserProfileDto";


@Injectable()
export class UpdateUserProfileDtoAssembler {
    disasemblyInto(userprofile: UpdateUserProfileDto): UserProfile{
     const  profile = UserProfile.newInstace();
     profile.firstName = userprofile.firstName;
     profile.lastName = userprofile.lastName;
     profile.pictureURl = userprofile.pictureURl;
     profile.id = userprofile.id;
     return profile;
    }
}