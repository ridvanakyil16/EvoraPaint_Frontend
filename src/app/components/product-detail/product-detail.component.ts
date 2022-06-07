import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariable } from 'src/app/models/global';
import { Product } from 'src/app/models/product';
import { ProductImages } from 'src/app/models/productImages';
import { ProductService } from 'src/app/services/product.service';
import {OrderService} from "../../services/order.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import * as $ from 'jquery';
import {ToastrService} from "ngx-toastr";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OwlOptions} from "ngx-owl-carousel-o";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  owlOptions_product: OwlOptions = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
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

  productImages : ProductImages[];
  firstproductImage : string;
  productDetails : Product;
  isAdded: boolean = false;
  isNotAdded: boolean = false;
  formError: boolean = false;
  message: string;
  currentProduct : Product;
  products : Product[];
  productsReverse : Product[];
  userIsAdmin : boolean;
  orderAddForm : FormGroup;
  formForNames: FormGroup;
  activeLanguage: object;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute ,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private languageService: LanguageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.orderAddForm = this.formBuilder.group({
      productId: new FormControl(null, Validators.required),
      unitAmount: new FormControl(null, Validators.required),
      senderNameSurname: new FormControl(null, Validators.required),
      senderMail: new FormControl(null, [Validators.required,Validators.email]),
      senderPhone: new FormControl(null, Validators.required),
    })

    if(localStorage.getItem("langName")){
      this.languageService.setLanguageName(JSON.parse(String(localStorage.getItem("langName"))))
    }

    this.languageService.getLanguageName().subscribe((response) => {
      this.activeLanguage = response
      this.getProduct()
      this.activatedRoute.params.subscribe(params =>{
        this.getProductDetailByProduct(params["productId"])
        this.getImagesByProduct(params["productId"])
      })
      // @ts-ignore
    })

    this.authService.getUserIsAdmin().subscribe((response) => {
      this.userIsAdmin = response;
    });

  }

  getProductDetailByProduct(productId:number){
    // @ts-ignore
      this.productService.getProductDetailByProduct(productId).subscribe(response => {
        this.productDetails = response.data
        console.log(this.productDetails.categoryId)
      })
  }

  getImagesByProduct(productId:number){
    this.productService.getImagesByProduct(productId).subscribe(response => {
      this.productImages = response.data
      this.firstproductImage = this.apiUrl + this.productImages[0].imagePath
      this.productImages.forEach(image => {
        image.imagePath = this.apiUrl + image.imagePath
      });
      console.log(this.productImages)
    })
  }

  getProduct(){
    this.productService.getProduct().subscribe((response) => {
      // @ts-ignore
      this.productService.getProductByLanguage(this.activeLanguage.id).subscribe((response) => {
        this.products = response.data;
        this.productsReverse = this.products.slice().reverse();
        window.scroll(0,0)
      })
    })
  }

  imageChange(image:ProductImages){
    this.productImages.forEach(i =>{
      if(i.imageId == image.imageId){
        this.firstproductImage = image.imagePath
      }
    })
  }

  setCurrentProductOrder(productDetails:Product){
    this.currentProduct = productDetails;
    this.router.navigateByUrl("/product/" + productDetails.id + "/order")
  }

  setCurrentProduct(product:Product){
    this.currentProduct = product;
    this.router.navigateByUrl("/product/" + product.id)
    window.scroll(0,0)
  }

  resetForm(){
      setTimeout(() => {
        this.isAdded = false;
        this.message = '';
        this.orderAddForm.reset();
        this.formForNames.reset();
      });
  }

  orderAdd() {
    if (this.productDetails.id) {
      console.log(this.productDetails.id)
      this.orderAddForm.patchValue({
        productId: this.productDetails.id,
      })

      console.log(this.orderAddForm.value)

      if (this.orderAddForm.valid) {
        // @ts-ignore
        window.$('#exampleModal').modal('hide');
        this.toastrService.success(this.message)
        this.productService.orderAdd(this.orderAddForm.value).subscribe((response) => {
          this.isAdded = true;
          this.message = response.message;
          console.log(this.message);
          setTimeout(() => {
            this.isAdded = false;
            this.message = '';
            this.orderAddForm.reset();
            this.formForNames.reset();
          }, 3000);
        }, (responseError) => {
          console.log(responseError)
          if (responseError.error.Errors && responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.isNotAdded = true;
              this.message = responseError.error.Errors[i].ErrorMessage
            }
          }
        })

      } else {
        this.formError = true;
        this.message = 'Hatalı Form!';
        setTimeout(() => {
          this.formError = false;
          this.message = "";
        }, 3000);
      }

    } else {
      this.formError = true;
      this.message = 'Hatalı Form!';
      setTimeout(() => {
        this.formError = false;
        this.message = "";
      }, 3000);
    }
  }
}
