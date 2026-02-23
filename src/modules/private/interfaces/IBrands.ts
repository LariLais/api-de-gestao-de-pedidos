export interface IBrandInput {
  name: string;
  visible?: boolean | undefined;
}

export interface IBrandResponse {
  id: number;
  name: string;
  visible: boolean | undefined;
}
