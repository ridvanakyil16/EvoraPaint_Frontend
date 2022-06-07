import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'
import { NgsRevealModule } from 'ngx-scrollreveal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ContactComponent } from './components/contact/contact.component';
import { AvatarPipe } from './pipe/avatar.pipe';
import { ProductImageAddComponent } from './components/product-image-add/product-image-add.component';
import { ColorDirective } from './directives/color.directive';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OrderComponent } from './components/order/order.component';
import { ProductModifyComponent } from './components/product-modify/product-modify.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SustainabilityComponent } from './components/sustainability/sustainability.component';
import { KvkkComponent } from './components/kvkk/kvkk.component';

import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeSectionComponent,
    ProductDetailComponent,
    NavbarComponent,
    ProductAddComponent,
    ContactComponent,
    AvatarPipe,
    ProductImageAddComponent,
    ColorDirective,
    LoginComponent,
    OrderComponent,
    ProductModifyComponent,
    AboutUsComponent,
    SustainabilityComponent,
    KvkkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgsRevealModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
