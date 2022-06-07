import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {Category} from "../../models/category";
import {Product} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-product-modify',
  templateUrl: './product-modify.component.html',
  styleUrls: ['./product-modify.component.css']
})
export class ProductModifyComponent implements OnInit {

  isAdded: boolean = false;
  isNotAdded: boolean = false;
  formError: boolean = false;
  message: string;

  productForm: FormGroup;
  formForNames: FormGroup;

  products: Product[];
  categories: Category[];

  product: Product;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute:ActivatedRoute ,
    private router:Router,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      colorName: new FormControl(null, Validators.required),
      brandName: new FormControl(null, Validators.required),
      unitPrice: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });

    this.formForNames = new FormGroup({
      name: new FormControl(null, Validators.required),
      categoryName: new FormControl(null, Validators.required)
    });

    this.activatedRoute.params.subscribe(params =>{
      this.getAllProducts();
      this.getProductById(params["productId"])
    })

  }

  getAllProducts(){
    this.productService.getProduct().subscribe(response =>{
      this.products = response.data
    });
  }

  getProductById(id: number){
        this.productService.getProductDetailByProduct(id).subscribe(response => {
          this.product = response.data

          this.categoryService.getCategoryById(this.product.categoryId).subscribe((response)=>{
            this.formForNames.patchValue({
              categoryName : response.data.name
            });
          });

          this.productForm.patchValue({
            id: this.product.id,
            categoryId: this.product.categoryId,
            name: this.product.name,
            colorName: this.product.colorName,
            brandName: this.product.brandName,
            unitPrice: this.product.unitPrice,
            description: this.product.description
          });

          this.getAllCategories();
       })
  }

  getProductByName(e: any){
    this.products.forEach(element =>{
      if(element.name == e.target.value){
        this.product = element

        this.categoryService.getCategoryById(this.product.categoryId).subscribe((response)=>{
          this.formForNames.patchValue({
            categoryName : response.data.name
          });
        });

        this.productForm.patchValue({
          id: this.product.id,
          categoryId: this.product.categoryId,
          name: this.product.name,
          colorName: this.product.colorName,
          brandName: this.product.brandName,
          unitPrice: this.product.unitPrice,
          description: this.product.description
        });
      }
    });
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  getCategoryByName(e:any){
    this.category;
    this.categories.forEach((element) =>{
      if (element.name == e.target.value) {
        this.category = element;

        this.productForm.patchValue({
          categoryId: this.category.id,
        });
      }
    })
  }

  update(){
    if(this.productForm.valid){
      let productModel = Object.assign({}, this.productForm.value);
      this.productService.productUpdate(productModel).subscribe(response =>{
        this.isAdded = true;
        this.message = response.message;
        this.toastrService.success(this.message)
        setTimeout(()=>{
          this.isAdded = false;
          this.message = "";
          this.productForm.reset();
          this.formForNames.reset();
          this.categories = [];
        }, 1000)
      },responseError =>{
          if(responseError.error.Errors.length > 0){
          for (let i=0; i < responseError.error.Errors.length; i++){
            this.isNotAdded = true;
            this.message = responseError.error.Errors[i].ErrorMessage;
          }
        }
      }
      );
    }
    else{
      this.formError = true;
      this.message = 'Hatalı Form!';
      this.toastrService.error(this.message)
      setTimeout(()=>{
        this.formError = false;
        this.message = "";
      }, 2000)
    }
  }

  delete(){
    if(this.productForm.valid){
      console.log(this.productForm)
      let productModel = Object.assign({}, this.productForm.value);
      this.productService.productDelete(productModel).subscribe(response => {
        this.isAdded = true;
        this.message = response.message;
        this.toastrService.success(this.message)
          setTimeout(()=>{
            this.isAdded = false;
            this.message = "";
            this.productForm.reset();
            this.formForNames.reset();
            this.categories = [];
          }, 1000)
      },(responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.isNotAdded = true;
              this.message = responseError.error.Errors[i].ErrorMessage;
            }
          }
        }
      );
    }
    else {
      this.formError = true;
      this.message = 'Hatalı Form!';
      this.toastrService.error(this.message)
      setTimeout(() => {
        this.formError = false;
        this.message = '';
      }, 2000);
    }
  }
}
