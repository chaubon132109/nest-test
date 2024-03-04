import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour } from './tours.model';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<Tour>) {}

  async getAllTours(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }

  // Các phương thức khác
}