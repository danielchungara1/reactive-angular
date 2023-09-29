import {Component, OnInit} from '@angular/core';
import {PageMetadata} from "../product-interfaces";
import {Observable} from "rxjs";
import {ProductService} from "../product.service";

@Component({
  selector: 'product-paginator',
  templateUrl: './product-paginator.component.html',
  styleUrls: ['./product-paginator.component.scss']
})
export class ProductPaginatorComponent implements OnInit {

  pageMetadata$: Observable<PageMetadata>;
  pageMetadata: PageMetadata;
  isFirstPage: boolean;
  isLastPage: boolean;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.pageMetadata$ = this.productService.pageMetadata$;
    this.pageMetadata$.subscribe((pageMetadata: PageMetadata) => {
      this.pageMetadata = pageMetadata;
      this.isFirstPage = this.getPreview() < 0;
      this.isLastPage = (this.getLast() + parseInt(this.pageMetadata.limit)) === parseInt(this.pageMetadata.total);
    })
  }

  onClickFirst() {
    this.productService.changePage(0);
  }

  onClickPreview() {
    this.productService.changePage(this.getPreview());
  }

  onClickNext() {
    this.productService.changePage(this.getNext());
  }

  onClickLast() {
    this.productService.changePage(this.getLast());
  }

  getArrayNrosPaginas(productPage: PageMetadata): number[] {
    const start = 1;
    const end = Math.ceil(parseInt(productPage.total) / parseInt(productPage.limit))
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  getPreview() {
    return parseInt(this.pageMetadata.offset) - parseInt(this.pageMetadata.limit);
  }

  getNext() {
    return parseInt(this.pageMetadata.offset) + parseInt(this.pageMetadata.limit);
  }


  getLast() {
    return parseInt(this.pageMetadata.total) - parseInt(this.pageMetadata.limit) - 1;
  }

}
