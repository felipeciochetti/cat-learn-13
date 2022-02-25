import { Module } from './module';

export class Course {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dateCreated: Date;
  dateRelease: Date;
  lastUpdate: Date;
  createdBy: string;
  category: string;
  unitPrice: number;
  
  
  modules: Module[];
  imageToShow: any;

}
