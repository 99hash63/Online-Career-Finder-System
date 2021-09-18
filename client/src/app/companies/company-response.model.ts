import { MyCompanyOverviewModel } from './company-overview.model';

export interface CompanyResponse {
  success: boolean;
  // pagination: Object[];
  data: MyCompanyOverviewModel[];
}
