import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class UpdateItemDto {
    
    @IsString()
    @IsNotEmpty()
    readonly id: string;
    
    @IsString()
    readonly title: string;

    @IsString()
    readonly descrition: string;

    @IsNumber()
    @IsPositive()
    readonly amount: number;

    @IsNumber()
    @IsPositive()
    readonly period: number;
}
