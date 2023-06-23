import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { ClassComponent } from './Components/classes/class/class.component';
import { CartComponent } from './Components/shop/cart/cart.component';
import { ProductDetailsComponent } from './Components/shop/product-details/product-details.component';
import { ContactComponent } from './Components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'class/:id', component: ClassComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
