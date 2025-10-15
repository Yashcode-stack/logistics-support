import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import csvParser from "csv-parser";

@Injectable()
export class UploadService {
  async parseCsv(filePath: string): Promise<any[]> {
    console.log(" parseCsv function called");
    return new Promise((resolve, reject) => {
      const results: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          // delete file after processing
          //   fs.unlinkSync(filePath);
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
