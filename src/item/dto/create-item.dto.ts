import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    readonly title:string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly amount: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly period: number;

    @IsNotEmpty()
    @IsArray()
    readonly image: Array<string>;

    @IsNotEmpty()
    @IsString()
    readonly category: string;
}