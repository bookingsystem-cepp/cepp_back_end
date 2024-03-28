import { IsNotEmpty, IsString } from "class-validator";

export class ApproveDTO {
    @IsString()
    @IsNotEmpty()
    readonly historyId: string;
}
