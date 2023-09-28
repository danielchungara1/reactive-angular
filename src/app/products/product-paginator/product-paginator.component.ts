import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductPage} from "../product-interfaces";
import {Observable} from "rxjs";
import {ProductService} from "../product.service";

@Component({
  selector: 'product-paginator',
  templateUrl: './product-paginator.component.html',
  styleUrls: ['./product-paginator.component.scss']
})
export class ProductPaginatorComponent implements OnInit{

  productPage$: Observable<ProductPage>;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productPage$ = this.productService.productPage$;
  }

  getArrayNrosPaginas(productPage: ProductPage): number[] {
    const start = 1;
    const end = Math.ceil( parseInt(productPage.total)/parseInt(productPage.limit))
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

}
