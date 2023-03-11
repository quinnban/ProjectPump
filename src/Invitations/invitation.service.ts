import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SES } from "aws-sdk";
import { SendTemplatedEmailRequest } from "aws-sdk/clients/ses";
import { InjectAwsService } from "nest-aws-sdk";
import { Repository } from "typeorm";
import { InvitationDtoAssembler } from "./assemblers/invitationDto.assembler";
import { Invitation } from "./entities /invitation.entity";
import { InvitationDto } from "./models/invitationDto";

@Injectable()
export class InvitationService {
    constructor( 
        @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
        private invitationAssembler: InvitationDtoAssembler,
        @InjectAwsService(SES) private readonly ses: SES,
    ) {}


    async create(email:string): Promise<InvitationDto> {
        const invitation = Invitation.newInstance();
        invitation.email = email;
        await this.invitationRepository.save(invitation);
        return this.invitationAssembler.assemble(invitation);
    }

    async sendInvite(email:string): Promise<void> {
        const invitation = await this.create(email);
        const template : SendTemplatedEmailRequest;
        template.Template=`
            <html>
                <body>
                <span>Hello,</span>
                <br>
                <span>Welcome to the  Migration Unlimited Workout App!</span>
                <br>
                <span> To create an account please click the <a href="$link">link</a> within 24 hours.</span>
                </body>
        </html>
      `;
      template.TemplateData=`{"$link":"domainName.com/api/v1/invitation/" + ${invitation.id}`;
      template.Destination.ToAddresses.push(invitation.email);
      template.Source = "noreply@migrationunlimited.com";

     await this.ses.sendTemplatedEmail(template)

    }



}