export interface ICategoryInput {
  name: string;
}

export interface ICategoryResponse {
  id: number;
  name: string;
  created_at: Date | null;
  updated_at: Date | null;
}
