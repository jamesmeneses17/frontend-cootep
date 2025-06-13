export interface EmploymentHistory {
  id: number;
  startDate: string;
  end_date: string;
  position: {
    id: number;
    title: string;
  };
  contract_type: {
    id: number;
    name: string;
  };
}

export interface Employee {
  id: number;
  national_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  user: {
    email: string;
  };
  status: {
    name: string;
  };
  employment_history: EmploymentHistory[];
}
