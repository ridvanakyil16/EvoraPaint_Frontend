import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {ProductImages} from "../../models/productImages";
import {GlobalVariable} from "../../models/global";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  apiUrl = GlobalVariable.BASE_URL

  productDetails : Product;
  product:Product;
  productImages : ProductImages[];
  firstproductImage : string;

  isAdded: boolean = false;
  isNotAdded: boolean = false;
  formError: boolean = false;
  message: string;

  orderAddForm : FormGroup;
  formForNames: FormGroup;

  elma: number

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute ,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params =>{
      this.getProductDetailByProduct(params["productId"])
      this.getImagesByProduct(params["productId"])
    })

    this.orderAddForm = this.formBuilder.group({
      productId: new FormControl(null, Validators.required),
      UnitAmount: new FormControl(null, Validators.required),
      SenderNameSurname: new FormControl(null, Validators.required),
      SenderMail: new FormControl(null, [Validators.required,Validators.email]),
      SenderPhone: new FormControl(null, Validators.required),
    })
  }

  getProductDetailByProduct(productId:number){
    this.productService.getProductDetailByProduct(productId).subscribe(response => {
      this.productDetails = response.data
      this.elma = this.productDetails.id
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

  orderAdd() {
    if (this.elma) {
      console.log(this.elma)
      this.orderAddForm.patchValue({
        productId: this.productDetails.id,
      })

      console.log(this.orderAddForm.value)

      if (this.orderAddForm.valid) {
        this.productService.orderAdd(this.orderAddForm.value).subscribe((response) => {
          this.isAdded = true;
          this.message = response.message;
          console.log(this.message);
          setTimeout(() => {
            this.isAdded = false;
            this.message = '';
            this.orderAddForm.reset();
            this.formForNames.reset();
            this.productDetails;
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
