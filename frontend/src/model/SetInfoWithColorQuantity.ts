import type { PartColorQuantity } from "./PartColorQuantity";

export interface SetInfoWithColorQuantity {
  id: number;
  quantity: number;
  name: string;
  year: number;
  imageUrl: string;
  quantityPerColor: PartColorQuantity[];
}
