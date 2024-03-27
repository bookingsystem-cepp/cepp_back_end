import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "src/category/entities/category.entity";

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
}

export const ItemSchema = SchemaFactory.createForClass(Item);