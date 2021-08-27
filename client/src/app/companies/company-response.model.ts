import { MyCompanyOverviewModel } from './company-overview.model';
import { Company } from './company.model';

export interface CompanyResponse {
  success: boolean;
  // pagination: Object[];
  data: MyCompanyOverviewModel[];
}
