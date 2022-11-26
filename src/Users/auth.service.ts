import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { LoginDto } from "./models/loginDto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService){}

    async login(login: LoginDto): Promise<string> {
        const user = await this.usersRepository.findOneBy({email:login.email});
        if(!user){
            throw new HttpException( 'Invalid',HttpStatus.UNAUTHORIZED)
        }

        if(bcrypt.compareSync(login.password,user.password)){
            return this.jwtService.sign({ payload: {profileId:user.profileId,role:user.role}});
        }
        throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED)

    }

}