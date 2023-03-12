import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/Users/user.module";
import { Invitation } from "./entities /invitation.entity";
import { InvitationController } from "./invitation.controller";
import { InvitationService } from "./invitation.service";

@Module({
    imports: [TypeOrmModule.forFeature([Invitation]),
    UserModule],
    controllers: [InvitationController],
    providers: [InvitationService],
    exports:[InvitationService]
  })

  export class InvitationModule {}