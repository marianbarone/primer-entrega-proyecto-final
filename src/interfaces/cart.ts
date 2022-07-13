import { Product } from "./product";

export interface Cart  {
    id: number,
    timestamp: string,
    products: Product []  
}