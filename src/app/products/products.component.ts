import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Observable} from "rxjs";
import {Category, Product} from "./product-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;

  simpleForm: FormGroup;
  productSelected: Product;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {

    this.simpleForm = this.formBuilder.group({
      categoryId: '',
      productId: '',
    })

    this.simpleForm.get('categoryId').valueChanges.subscribe((value) => {
      if (value) {
        this.products$ = this.productService.searchProductsByCategory({id: value, name: ''})
      }
    });

  }

  ngOnInit(): void {
    this.categories$ = this.productService.searchCategories();
  }

  onProductSelected(product: Product) {
    this.productSelected = product;
  }

  onCategorySelected(category: Category) {
    this.productSelected = null;
    this.productId = '';
  }


  get productId() { return this.simpleForm.get('productId').value;}
  set productId(value: string) { this.simpleForm.get('productId').setValue(value); }
  get categoryId() { return this.simpleForm.get('categoryId').value;}
  set categoryId(value: string) { this.simpleForm.get('categoryId').setValue(value); }

}
