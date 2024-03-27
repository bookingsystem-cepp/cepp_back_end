import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto {

    @IsString()
    @IsNotEmpty()
    readonly id: string 
    
    @IsString()
    readonly name: string

    @IsString()
    readonly location: string

    @IsString()
    readonly description: string
}