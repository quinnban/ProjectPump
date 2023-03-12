import { Invitation } from "../entities /invitation.entity";
import { InvitationDto } from "../models/invitationDto";

export class InvitationDtoAssembler {

    assemble(invitation :Invitation): InvitationDto {
        let to = new InvitationDto()
        to.id = invitation.id;
        to.email = invitation.email;
        return to;
    }

}