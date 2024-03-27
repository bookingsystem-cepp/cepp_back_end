import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    timestamps:false,
})
export class User {
    _id: mongoose.Types.ObjectId;

    @Prop()
    name: string;

    @Prop({ require: true })
    email: string;

    @Prop()
    Image: string;

    @Prop()
    emailVerified: string;

    @Prop()
    scores: number;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    tel: string;

    @Prop()
    username: string;

    @Prop()
    year: number;
}

export const UserSchema = SchemaFactory.createForClass(User);