import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly ownerId: string;

    @IsString()
    @IsNotEmpty()
    readonly location: string;

    @IsString()
    readonly description: string;
}
