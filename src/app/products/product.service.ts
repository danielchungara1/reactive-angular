import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Category, PageMetadata, Product} from "./product-interfaces";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private pageMetadataSub: BehaviorSubject<PageMetadata> = new BehaviorSubject<PageMetadata>({total: '0', limit: '50', offset: '0', primary_results: '0'});
  pageMetadata$: Observable<PageMetadata> = this.pageMetadataSub.asObservable();

  private productListSub: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productList$: Observable<Product[]> = this.productListSub.asObservable();

  category: Category = {id: 'MLA1512', name: ''};

  private URL_BASE = 'https://api.mercadolibre.com';
  private ENDPOINT_CATEGORIES = this.URL_BASE + '/sites/MLA/categories';
  private ENDPOINT_PRODUCTS = this.URL_BASE + '/sites/MLA/search';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  searchCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.ENDPOINT_CATEGORIES)
  }

  searchProductsByCategory(category: Category, offset: number): void {
    this.httpClient.get<Product[]>(this.ENDPOINT_PRODUCTS, {params: {limit: 50, category: category.id, offset: offset}}).pipe(
      tap((response: any) => {
        this.pageMetadataSub.next(response.paging)
      }),
      map((response: any) => {
        return response.results
      }),
      tap((productList: Product[]) => {
        this.productListSub.next(productList);
      }),
    ).subscribe();
  }

  changePage(offset: number) {
    this.searchProductsByCategory(this.category, offset);
  }

}
