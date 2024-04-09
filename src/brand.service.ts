import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './brand.schema';
import * as faker from 'faker';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brand') private readonly brandModel: Model<Brand>,
  ) {}

  // transformation the brands data
  async transformDataInPlace(): Promise<void> {
    const brands = await this.brandModel.find().exec();

    for (const brand of brands) {
      // yearCreated
      if (brand.yearCreated && !brand.yearFounded) {
        brand.yearFounded = brand.yearCreated;
      }
      if (!brand.yearFounded || typeof brand.yearFounded !== 'number') {
        brand.yearFounded = 1600;
      }
      if (!brand.yearFounded || typeof brand.yearFounded !== 'number') {
        brand.yearFounded = 1600;
      }
      // headquarters
      if (!brand.headquarters) {
        brand.headquarters = 'headquarters not define';
      }
      // numberOfLocations
      if (typeof brand.numberOfLocations !== 'number') {
        brand.numberOfLocations = 1;
      }
      // brandName
      if (!brand.brandName) {
        brand.brandName = 'brandName not define';
      }
      await brand.save();
    }
  }

  // import seed data
  /* to run it must to call api at url !!!!!
    POST request to the /brands/generateTestData 
    for example, using a tool like cURL or Postman
    curl POST http://localhost:3000/brands/generateTestData
   */
  async generateTestData(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const brand = new this.brandModel({
        brandName: faker.company.companyName(),
        yearFounded: faker.datatype.number({
          min: 1600,
          max: new Date().getFullYear(),
        }),
        headquarters: faker.address.city(),
        numberOfLocations: faker.datatype.number({ min: 1 }),
      });
      await brand.save();
    }
  }
}
