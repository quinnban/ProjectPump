import { Body, Controller, Post } from "@nestjs/common";
import { InvitationService } from "./invitation.service";

@Controller('invitation')
export class InvitationController {

    constructor(private invitationService: InvitationService ){}

    @Post()
    getProfilePicture(@Body() email: string): Promise<void> {
      return this.invitationService.sendInvite(email);
    }

}