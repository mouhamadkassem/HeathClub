import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, User } from 'src/interface';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  loader: boolean = true;
  product!: Product;
  userLogin!: User;
  showPopUp: boolean = false;
  added: boolean = false;
  like = faThumbsUp;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) =>
      this.productsService.getProduct(data['id']).subscribe((data) => {
        this.product = data;
        this.loader = false;
      })
    );
    new BehaviorSubject(localStorage.getItem('userLogin') ?? '{}').subscribe(
      (data) => (this.userLogin = JSON.parse(data))
    );
  }

  addToCart() {
    if (!this.userLogin.email) {
      this.showPopUp = true;
      setTimeout(() => {
        this.showPopUp = false;
      }, 5000);
      return;
    }
    const itemInCart = this.userLogin.cart.filter(
      (item) => item._id == this.product._id
    )[0];
    if (itemInCart) {
      this.userLogin.cart.forEach((item) => {
        if (item._id == this.product._id) {
          item.quantity++;
          this.added = true;
          setTimeout(() => {
            this.added = false;
          }, 2000);
        }
      });
    } else {
      this.userLogin.cart.push({ quantity: 1, ...this.product });
      localStorage.setItem('userLogin', JSON.stringify(this.userLogin));
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 2000);
    }
  }
}
