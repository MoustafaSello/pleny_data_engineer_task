import { Controller, Post } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('transform')
  async transformData(): Promise<string> {
    try {
      await this.brandService.transformDataInPlace();
      return 'Data transformation completed successfully.';
    } catch (error) {
      return error.message;
    }
  }

  @Post('generateTestData')
  async generateTestData(): Promise<string> {
    try {
      await this.brandService.generateTestData();
      return 'Test data generated successfully.';
    } catch (error) {
      return error.message;
    }
  }
}
