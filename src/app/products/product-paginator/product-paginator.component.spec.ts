import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginatorComponent } from './product-paginator.component';

describe('ProductPaginatorComponent', () => {
  let component: ProductPaginatorComponent;
  let fixture: ComponentFixture<ProductPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPaginatorComponent]
    });
    fixture = TestBed.createComponent(ProductPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
