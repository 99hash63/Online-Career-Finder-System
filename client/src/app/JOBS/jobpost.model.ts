export class Jobpost {
  _id!: string;
  title!: string;
  company!: string;
  location!: string;
  industry!: string;
  type!: string;
  activelyHiring!: string;
  salary: number | undefined;
  expectedApplicants: number | undefined;
  website!: string;
  description!: string;
  image!: string;
  publish: boolean | undefined;
  appliedApplicants!: string;
  createdDate: Date | undefined;

  constructor() {}
}
