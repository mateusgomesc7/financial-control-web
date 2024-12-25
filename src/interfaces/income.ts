export interface Income {
  id: number;
  name: string;
  amount: number;
  id_user_fk: number;
  member: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IncomeSimple {
  name: string;
  amount: number;
  id_member_fk: number;
}

export interface IncomesPaginated {
  items: Income[];
  pagination: {
    count?: number;
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
}
