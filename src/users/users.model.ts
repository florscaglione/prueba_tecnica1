import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Contact } from 'src/contacts/contacts.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }] })
  contacts: Contact[];
}

export const UserSchema = SchemaFactory.createForClass(User);
