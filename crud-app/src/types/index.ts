export interface Item {
  id: string;
  title: string;
  description: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface ItemsResponse {
  data: Item[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ItemResponse {
  data: Item;
}

export interface CreateItemPayload {
  title: string;
  description: string;
  status: Item["status"];
}

export interface UpdateItemPayload extends Partial<CreateItemPayload> {}

export interface ApiError {
  message: string;
  code?: string;
}
