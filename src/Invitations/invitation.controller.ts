import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/Users/models/createUserDto";
import { InvitationService } from "./invitation.service";

@Controller('invitation')
export class InvitationController {

    constructor(private invitationService: InvitationService){}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    create(@Body() email: string): Promise<void> {
      return this.invitationService.send(email);
    }
    @Post(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    accept(@Param('id') id: string ,@Body() user: CreateUserDto): Promise<void> {
    return this.invitationService.accept(id,user);
    }

}