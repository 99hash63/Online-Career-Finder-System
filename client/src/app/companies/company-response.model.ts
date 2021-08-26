import { Company } from './company.model';

export interface CompanyResponse {
  success: boolean;
  pagination: Object[];
  data: Company[];
}
