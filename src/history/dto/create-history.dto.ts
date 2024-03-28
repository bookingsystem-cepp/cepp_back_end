import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateHistoryDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly count: number;

    @IsString()
    @IsNotEmpty()
    readonly borrowerId: string;

    @IsString()
    @IsNotEmpty()
    readonly itemId: string;
}
