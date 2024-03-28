import { IsNotEmpty, IsString } from "class-validator";

export class ReturnDTO {
    @IsString()
    @IsNotEmpty()
    readonly historyId: string;
}
