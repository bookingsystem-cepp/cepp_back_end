import { IsNotEmpty, IsString } from "class-validator";

export class CreateHistoryDto {
    @IsString()
    @IsNotEmpty()
    readonly borrowUserId: string;

    @IsString()
    @IsNotEmpty()
    readonly itemId: string;
}
