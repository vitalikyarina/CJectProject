import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FSHelperService {
  public deleteDir(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach((file) => {
        const curPath = path.join(dirPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          this.deleteDir(curPath);
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

  public getFilesFromDir(path: string): string[] {
    let files: string[] = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
    }
    return files;
  }

  public createDirIfNot(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {
        recursive: true,
      });
    }
  }
}
