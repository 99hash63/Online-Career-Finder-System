export class Jobpost {
  _id?:string;
  title?:string;
  company?: string;
  location?: string;
  industry?: string;
  type?: string;
  activelyHiring?: string;
  salary?: number;
  expectedApplicants?: number;
  website?: string;
  description?: string;
  image?: string;
  publish?: boolean;
  appliedApplicants?: number;
  createdDate?: Date;

  constructor() {}
}
