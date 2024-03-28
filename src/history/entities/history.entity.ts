import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date } from "mongoose";
import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";

@Schema({
    timestamps: false
})
export class History {
    _id: mongoose.Types.ObjectId

    @Prop({default: 'pending'})
    status: string

    @Prop({type: Date})
    startDate: Date

    @Prop({type: Date})
    endDate: Date

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    borrower: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    owner: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true})
    item: Item

    @Prop({default: 1})
    count: number
}

export const HistorySchema = SchemaFactory.createForClass(History);