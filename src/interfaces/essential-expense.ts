export interface EssentialExpense {
  id: number;
  name: string;
  expected: number;
  id_user_fk: number;
  member: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface EssentialExpenseSimple {
  name: string;
  expected: number;
  id_member_fk: number;
}

export interface EssentialExpensesPaginated {
  items: EssentialExpense[];
  pagination: {
    count?: number;
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
}
