import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

@Schema({
    timestamps:false
})
export class Item {
    _id: mongoose.Types.ObjectId;

    @Prop({required: true})
    title : string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    amount: number;

    @Prop({required: true})
    avaliable: number;

    @Prop({required: true})
    period: number;

    @Prop({required: true})
    image: string[];

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: Category;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: User;
}

export const ItemSchema = SchemaFactory.createForClass(Item);