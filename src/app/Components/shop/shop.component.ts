import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  loader: boolean = true;
  img: string =
    'https://lsmedia.linker-cdn.net/62267/2022/7446130.jpeg?d=600x400';

  products: Product[] = [];
  store: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts('clothes').subscribe((data) => {
      this.products = data;
      this.loader = false;
    });
  }

  filterProducts(type: string) {
    this.loader = true;
    this.productsService.getProducts(type).subscribe((data) => {
      this.products = data;
      this.loader = false;
    });
  }
}
