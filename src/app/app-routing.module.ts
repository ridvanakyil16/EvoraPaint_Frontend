import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductImageAddComponent } from './components/product-image-add/product-image-add.component';
import { LoginGuard } from './quards/login.guard';
import {OrderComponent} from "./components/order/order.component";
import {ProductModifyComponent} from "./components/product-modify/product-modify.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {SustainabilityComponent} from "./components/sustainability/sustainability.component";
import {KvkkComponent} from "./components/kvkk/kvkk.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {HomeSectionComponent} from "./components/home-section/home-section.component";

const routes: Routes = [
  {path:"", pathMatch:"full" ,component:HomeSectionComponent },
  {path:"contact", component:ContactComponent},
  {path:"sustainability", component:SustainabilityComponent},
  {path:"kvkk", component:KvkkComponent},
  {path:"about-us", component:AboutUsComponent},
  {path:"product/:productId", component:ProductDetailComponent},
  {path:"productAdd", component:ProductAddComponent , canActivate:[LoginGuard]},
  {path:"productUpdate/:productId", component:ProductModifyComponent , canActivate:[LoginGuard]},
  {path:"productDelete", component:ProductModifyComponent , canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"productAdd/images/:productId",component: ProductImageAddComponent},
  {path:"product/:productId/order",component: OrderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
