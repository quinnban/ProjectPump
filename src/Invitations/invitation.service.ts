import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SES } from "aws-sdk";
import { SendTemplatedEmailRequest } from "aws-sdk/clients/ses";
import { InjectAwsService } from "nest-aws-sdk";
import { CreateUserDto } from "src/Users/models/createUserDto";
import { Repository } from "typeorm";
import { InvitationDtoAssembler } from "./assemblers/invitationDto.assembler";
import { Invitation } from "./entities /invitation.entity";
import { InvitationDto } from "./models/invitationDto";
import { UserService } from "src/Users/user.service";

@Injectable()
export class InvitationService {
    constructor( 
        @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
        private invitationAssembler: InvitationDtoAssembler,
        private userService: UserService,
        @InjectAwsService(SES) private readonly ses: SES,
    ) {}


    async create(email:string): Promise<InvitationDto> {
        const invitation = Invitation.newInstance();
        invitation.email = email;
        await this.invitationRepository.save(invitation);
        return this.invitationAssembler.assemble(invitation);
    }

    async send(email:string): Promise<void> {
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
      template.TemplateData=`{"$link":"domainName.com/#/invitation/" + ${invitation.id}`;
      template.Destination.ToAddresses.push(invitation.email);
      template.Source = "noreply@migrationunlimited.com";

     const result = await this.ses.sendTemplatedEmail(template);

    }

    async accept(id:string, user: CreateUserDto): Promise<void> {
        const invitation = await this.invitationRepository.findOneByOrFail({id});
        if(invitation.accepted){
            throw new HttpException('Invitation was already accepted', HttpStatus.BAD_REQUEST)
        }
        const date = new Date();
        if(this.getDifferenceInHours(date,invitation.createdDate) > 24){
            throw new HttpException('Invitation has expired', HttpStatus.BAD_REQUEST)
        }
        invitation.accepted = true;
        await this.invitationRepository.save(invitation);
        await this.userService.create(user);
    }

    private getDifferenceInHours(date1:Date,date2:Date):number{
        return Math.abs(date1.getTime() - date2.getTime()) / 36e5
    }



}