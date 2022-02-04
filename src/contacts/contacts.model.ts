import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
