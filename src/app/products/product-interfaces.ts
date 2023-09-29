export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
  sold_quantity: string;

}

export interface PageMetadata {
  total: string;
  primary_results: string;
  offset: string;
  limit: string;
}
