import { Lesson } from './lesson';
import { Course } from './course';

export class Module {
  id: number;
  code: string;
  name: string;
  description: string;
  duration: string;
  createdBy: string;
  number: string;

  dateRelease: Date;
  dateCreated: Date;

  idCourse: number;

  lessons: Lesson[];
}
