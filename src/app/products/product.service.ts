import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Category, Product, ProductPage} from "./product-interfaces";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productPageSub: BehaviorSubject<ProductPage> = new BehaviorSubject<ProductPage>(undefined);
  productPage$: Observable<ProductPage> = this.productPageSub.asObservable();

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
      tap((response: any) => {
        this.productPageSub.next(response.paging)
      }),
      map((response: any) => {
        return response.results
      }),
    );
  }


}
