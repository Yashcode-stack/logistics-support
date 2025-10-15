import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { diskStorage } from "multer";
import * as path from "path";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post("csv")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./src/commonts/uploads",
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          cb(null, `${name}-${Date.now()}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== "text/csv") {
          return cb(
            new BadRequestException("Only CSV files are allowed!"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    // Parse the CSV file
    const parsedData = await this.uploadService.parseCsv(file.path);

    return {
      message: "File uploaded and parsed successfully",
      data: parsedData,
    };
  }
}
