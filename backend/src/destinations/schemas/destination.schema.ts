
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DestinationDocument = HydratedDocument<Destination>;

@Schema({ timestamps: true })
export class Destination {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  imageUrl: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
