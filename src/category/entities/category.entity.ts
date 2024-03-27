import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import mongoose from "mongoose";

@Schema({
    timestamps: false
})
export class Category {
    _id: mongoose.Types.ObjectId;

    @Prop({required: true})
    name: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true})
    owner: User;

    @Prop({required:true})
    location: string;

    @Prop()
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);