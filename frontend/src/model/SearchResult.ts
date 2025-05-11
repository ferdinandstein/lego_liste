import type { PartColorQuantity } from "./PartColorQuantity";
import type { SetInfoWithColorQuantity } from "./SetInfoWithColorQuantity";

export interface SearchResult {
  quantityPerColor: PartColorQuantity[];
  setInfosWithColorQuantity: SetInfoWithColorQuantity[];
}
