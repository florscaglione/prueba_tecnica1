import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.model';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) //creamos la relacion con el modelo User
  userStartUp: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
