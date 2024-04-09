import { Schema, Document } from 'mongoose';

export interface Brand extends Document {
  _id: string;
  brandName: string;
  yearFounded: number;
  yearCreated: number;
  headquarters: string;
  hqAddress: string;
  numberOfLocations: number;
}

export const BrandSchema = new Schema<Brand>({
  brandName: { type: String, required: [true, 'Brand name is required'] },
  yearFounded: {
    type: Number,
    required: [true, 'Year founded is required'],
    min: 1600,
    max: [new Date().getFullYear(), 'Year founded cannot be in the future'],
  },
  headquarters: {
    type: String,
    required: [true, 'Headquarters location is required'],
    trim: true,
  },
  numberOfLocations: {
    type: Number,
    required: [true, 'Number of locations is required'],
    min: [1, 'There should be at least one location'],
  },
});
