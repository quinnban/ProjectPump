import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./models/loginDto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    login(@Body() user: LoginDto): Promise<string> {
    return  this.authService.login(user)  
    }


}