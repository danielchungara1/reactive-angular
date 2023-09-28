import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Category, Product} from "./product-interfaces";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL_BASE = 'https://api.mercadolibre.com';
  private ENDPOINT_CATEGORIES = this.URL_BASE + '/sites/MLA/categories';
  private ENDPOINT_PRODUCTS = this.URL_BASE + '/sites/MLA/search';

  constructor(
    private httpClient: HttpClient
  ) { }

  searchCategories() :Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.ENDPOINT_CATEGORIES)
  }

  searchProductsByCategory(category: Category) :Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.ENDPOINT_PRODUCTS, {params: {limit: 50, category: category.id}}).pipe(
      map((response: any) => {
        return response.results
      })
    );
  }


}
