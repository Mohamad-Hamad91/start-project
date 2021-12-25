import { ArmyServiceStatus } from 'src/utils/constants/armyServiceStatus';
import { City, Country } from 'src/utils/constants/countries';
import { Nationality } from 'src/utils/constants/nationalits';
import { Shift } from 'src/utils/constants/shift';
import { WorkType } from 'src/utils/constants/workType';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { MyFile } from 'src/utils/file/file.schema';
import { EmploymentHistory } from './employment-history.schema';
import { Course } from './course.schema';
import { Education } from './education.schema';
import { Link } from './link.schema';
import { UserSkill } from './user-skill.schema';
import { UserLang } from './user-lang.schema';
import { References } from './reference.schema';
import { Project } from './project.schema';
import { User } from 'src/api/users/users.schema';

export type ResumeDocument = Resume & Document;

@Schema()
export class Resume {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  email: string;

  @Prop()
  fName: string;

  @Prop()
  lName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MyFile' })
  photo: MyFile;

  @Prop()
  phone: string;

  @Prop()
  country: Country = Country.Syria;

  @Prop()
  city: City = City.UNSPECIFIED;

  @Prop()
  address: string;

  @Prop()
  birthDate: Date = new Date(1990, 1, 1);

  @Prop()
  nationality: Nationality = Nationality.Syrian;

  @Prop()
  available: boolean = true;

  @Prop()
  availableAt: Date = new Date();

  @Prop()
  workType: WorkType = WorkType.OTHER;

  @Prop()
  shift: Shift = Shift.UNSPECIFIED;

  @Prop()
  summary: string;

  @Prop()
  hobbies: string;

  @Prop()
  armyServiceStatus: ArmyServiceStatus = ArmyServiceStatus.Pending_For_Study;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EmploymentHistory' }] })
  employmentHistory: EmploymentHistory[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses: Course[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }] })
  education: Education[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }] })
  links: Link[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: Project[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'References' }] })
  references: References[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserLang' }] })
  languages: UserLang[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSkill' }] })
  skills: UserSkill[];
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
