import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-parallax-one',
  templateUrl: './parallax-one.component.html',
  styleUrls: ['./parallax-one.component.css']
})
export class ParallaxOneComponent implements OnInit {

  owlOptions_parallax_product: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 2000,
    margin: 10,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
          items: 1
      },
      750: {
          items: 2
      },
    }
  };

  products : Product[];
  currentProduct : Product;
  constructor(
    private productService:ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.productService.getProduct().subscribe(response => {
      this.products = response.data;
    })
  }

  setCurrentProduct(product:Product){
    this.currentProduct = product;
    this.router.navigateByUrl("/product/" + product.id)
  }
}
