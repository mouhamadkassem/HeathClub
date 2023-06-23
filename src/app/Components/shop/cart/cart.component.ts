import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { faThumbsUp, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any;
  isEmpty: boolean = false;
  totalCost: number = 0;
  user: any;
  popUp: boolean = false;
  like = faThumbsUp;
  shopIcon = faShoppingBag;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    new BehaviorSubject(localStorage.getItem('userLogin') ?? '{}').subscribe(
      (data) => {
        this.user = JSON.parse(data);
        this.items = this.user.cart;
        if (this.items.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.user.cart.forEach((item: any) => {
            this.totalCost += item.quantity * item.price;
          });
        }
      }
    );
  }

  save() {
    this.user.cart = this.items;
    localStorage.setItem('userLogin', JSON.stringify(this.user));
  }

  increase(data: any) {
    this.items.forEach((item: any) => {
      if (item._id == data._id) {
        item.quantity++;
        this.totalCost += item.price;
      }
    });
    this.save();
  }
  decrease(data: any) {
    this.items.forEach((item: any) => {
      if (item._id == data._id) {
        item.quantity--;
        this.totalCost -= item.price;
      }
    });
    this.items = this.items.filter((item: null | any) => item.quantity != 0);
    if (this.items.length == 0) {
      this.isEmpty = true;
    }
    this.save();
  }

  removeItem(data: number) {
    this.items = this.items.filter((item: any) => item._id != data);
    this.totalCost = 0;
    this.items.forEach((item: any) => {
      this.totalCost += item.quantity * item.price;
    });
    if (this.items.length == 0) this.clearAll();
    else this.save();
  }

  clearAll() {
    this.items = [];
    this.isEmpty = true;
    this.save();
  }

  checkout() {
    const items: { quantity: any; product: any }[] = [];
    this.items.forEach((item: any) =>
      items.push({
        quantity: item.quantity,
        product: item._id,
      })
    );
    const newCart = {
      userId: this.user._id,
      items: items,
      totalCost: this.totalCost,
    };
    this.userService.addCart(newCart).subscribe((data: any) => {
      localStorage.setItem('userLogin', JSON.stringify(data));
      this.clearAll();
      this.popUp = true;
      setTimeout(() => {
        this.popUp = false;
      }, 2000);
    });
  }
}
