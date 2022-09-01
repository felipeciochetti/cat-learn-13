import { Module } from './module';

export class Lesson {
  id: number;
  code: string;
  name: string;
  description: string;
  number: string;
  dateRelease: Date;
  dateCreated: Date;
  lastUpdate: Date;
  createdBy: string;
  category: string;
  duration: string;
  contentFilePath: string;
  contentFileName: string;
  typeFile: string;
  idModule: number;
}
