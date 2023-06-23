import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: {
    _id: number;
    imgUrl: string;
    title: string;
    desc: string;
    price: number;
  };
  shorten: boolean = false;

  ngOnInit(): void {
    if (this.product.desc.length > 50) {
      this.shorten = true;
      this.product.desc = this.product.desc.slice(0, 50);
    }
  }
}
