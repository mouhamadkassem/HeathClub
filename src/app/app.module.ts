import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { ShopComponent } from './Components/shop/shop.component';
import { CartComponent } from './Components/shop/cart/cart.component';
import { ProductComponent } from './Components/shop/product/product.component';
import { ProductDetailsComponent } from './Components/shop/product-details/product-details.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { ClassComponent } from './Components/classes/class/class.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SpinerComponent } from './Components/spiner/spiner.component';
import { PopUpComponent } from './Components/pop-up/pop-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ShopComponent,
    CartComponent,
    ProductComponent,
    ProductDetailsComponent,
    ClassesComponent,
    ClassComponent,
    ContactComponent,
    FooterComponent,
    SpinerComponent,
    PopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
