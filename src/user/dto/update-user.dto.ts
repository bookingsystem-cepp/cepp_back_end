import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateUserDto  {
    @IsString()
    @IsNotEmpty()
    readonly id: string

    @IsString()
    readonly username: string

    @IsString()
    @Matches(/[0-9]{10}/)
    readonly tel: string
}