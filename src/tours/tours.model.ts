import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Location {
  @Prop({
    type: { type: String, enum: ['Point'], default: 'Point' },
  })
  type: string;

  @Prop({ type: [Number] })
  coordinates: number[];

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  day: number;
}

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Tour extends Document {
  @Prop({
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name must have less or equal then 40 characters'],
    minlength: [10, 'A tour name must have more or equal then 10 characters'],
  })
  name: string;

  @Prop()
  slug: string;

  @Prop({ required: [true, 'A tour must have a duration'] })
  duration: number;

  @Prop({ required: [true, 'A tour must have a group size'] })
  maxGroupSize: number;

  @Prop({
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult',
    },
  })
  difficulty: string;

  @Prop({
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val: number) => Math.round(val * 10) / 10,
  })
  ratingsAverage: number;

  @Prop({ default: 0 })
  ratingsQuantity: number;

  @Prop({ required: [true, 'A tour must have a price'] })
  price: number;

  @Prop({
    validate: {
      validator: function (val: number): boolean {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  })
  priceDiscount: number;

  @Prop({ trim: true, required: [true, 'A tour must have a description'] })
  summary: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: [true, 'A tour must have a cover image'] })
  imageCover: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ select: false, default: Date.now })
  createdAt: Date;

  @Prop({ type: [Date] })
  startDates: Date[];

  @Prop({ default: false })
  secretTour: boolean;

  @Prop({
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  })
  startLocation: {
    type: string;
    coordinates: number[];
    address: string;
    description: string;
  };

  @Prop({ type: [Location] })
  locations: Location[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  guides: MongooseSchema.Types.ObjectId[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);