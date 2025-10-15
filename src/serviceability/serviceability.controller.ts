import { Controller, Post, Body, HttpCode, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { ServiceabilityService } from './serviceability.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { UploadService } from 'src/upload/upload.service';

@Controller('serviceability')
export class ServiceabilityController {
  constructor(private readonly serviceabilityService: ServiceabilityService,
        private readonly uploadService:UploadService

  ) {}

  @Post('check')
  @HttpCode(200)
  async checkServiceability(@Body() body: any) {
    return await this.serviceabilityService.checkServiceability(body);
  }

  @Post('batch-check')
  @UseInterceptors(
       FileInterceptor('file', {
        storage: diskStorage({
          destination: './src/commonts/uploads', 
          filename: (req, file, cb) => {            
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (file.mimetype !== 'text/csv') {
            return cb(new BadRequestException('Only CSV files are allowed!'), false);
          }
          cb(null, true);
        },
      }),
  )
  async handleBatch(@UploadedFile() file: Express.Multer.File) {
     if (!file) {
      throw new BadRequestException('File is required');
    }

    // Parse the CSV file
    const parsedData = await this.uploadService.parseCsv(file.path);
  const results = await this.serviceabilityService.batchCheckServiceability(parsedData);
  return { message: 'Batch processing complete', results };
}

}
