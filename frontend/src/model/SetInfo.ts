import type { PartColorQuantity } from "./PartColorQuantity";

export interface SetInfo {
    id: number;
    quantity: number;
    name: string;
    year: number;
    imageUrl: string;
    parts: Record<string, PartColorQuantity[]>;
}

