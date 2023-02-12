// Products
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    new?: boolean;
    image?: string;
}