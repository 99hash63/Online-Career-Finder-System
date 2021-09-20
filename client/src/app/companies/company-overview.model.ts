export interface MyCompanyOverviewModel {
  _id: string;

  industry: string;
  emp_count: string;

  founded: string;
  website: string;
  revenue: number;

  address: string;
  location: Object;

  title: string;
  description: string;

  logo: string;
  coverPhoto: string;
  otherPhotos: [string];

  isPublic: boolean;
  createdAt: string;
  createdBy: string;

  slug: string;
}
