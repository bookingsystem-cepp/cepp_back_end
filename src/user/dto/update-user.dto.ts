import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdateUserDto  {
    @IsString()
    @IsNotEmpty()
    readonly id: string

    @IsString()
    readonly firstname: string

    @IsString()
    readonly lastname: string

    @IsString()
    @Matches(/[0-9]{10}/)
    readonly tel: string
}