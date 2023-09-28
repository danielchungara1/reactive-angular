import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  async ngOnInit() {
    console.log("Se van a imprimir productos y luego marcas...");
    await this.getAndPrint();
    console.log("Deberia haber terminado de imprimir todo...");

  }

  getProduct(): Observable<string[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        const products = ["Monitor", "CPU", "Teclado"];
        observer.next(products);
        observer.complete();
      }, 1000)
    })
  }

  getBrands(): Observable<string[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        const products = ["LG", "Samsung", "Logitech"];
        observer.next(products);
        observer.complete();
      }, 2000)
    })
  }

  run() {
  }

  private async getAndPrint() {
    let products = await this.getProduct().toPromise();
    console.log(products);
    let brands = await this.getBrands().toPromise();
    console.log(brands);
  }

  // private async getAndPrint() {
  //   let result = await forkJoin([this.getBrands(), this.getProduct()]).toPromise();
  //   console.log(result[0]);
  //   console.log(result[1]);
  // }
}






