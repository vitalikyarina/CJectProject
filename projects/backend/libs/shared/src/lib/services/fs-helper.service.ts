import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import sharp from "sharp";

@Injectable()
export class FSHelperService {
  public deleteFolder(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => {
        const curPath = path.join(dirPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          this.deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(dirPath);
    }
  }

  public existsFile(path: string): boolean {
    return fs.existsSync(path);
  }

  public getFilesFromFolder(path: string): string[] {
    let files: string[] = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
    }
    return files;
  }

  public createFolder(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {
        recursive: true,
      });
    }
  }

  public async sharpToWebP(
    inputFile: string,
    outputFile: string,
  ): Promise<void> {
    const sharpToWebP = promisify(
      sharp(inputFile).toFile.bind(sharp(inputFile)),
    );

    try {
      await sharpToWebP(outputFile);
    } catch (e) {
      console.log(e);
    }
  }
}
