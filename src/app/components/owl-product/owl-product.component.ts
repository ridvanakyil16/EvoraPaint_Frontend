import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalVariable } from 'src/app/models/global';
import { Product } from 'src/app/models/product';
import { ProductImages } from 'src/app/models/productImages';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-owl-product',
  templateUrl: './owl-product.component.html',
  styleUrls: ['./owl-product.component.css']
})
export class OwlProductComponent implements OnInit {

  owlOptions_product: OwlOptions = {
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        },
    }
  };

  apiUrl = GlobalVariable.BASE_URL
  products : Product[];
  categories : Category[];
  productsReverse : Product[];
  currentProduct : Product;
  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
      this.getProduct()
      this.getCategory()
      this.getProductReverse()  
  }

  getProduct(){
    this.productService.getProduct().subscribe(response => {
      this.products = response.data;
    })
  }

  getProductReverse(){
    this.productService.getProduct().subscribe(response => {
       this.productsReverse = response.data.slice().reverse();
    })
  }

  getCategory(){
    this.categoryService.getCategory().subscribe(response => {
      this.categories = response.data;
    })
  }

  setCurrentProduct(product:Product){ 
    this.currentProduct = product;
    this.router.navigateByUrl("/product/" + product.id)
  }
}
