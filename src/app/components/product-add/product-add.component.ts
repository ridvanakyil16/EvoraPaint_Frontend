import { Component, OnInit } from '@angular/core';
import  { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import {LanguageService} from "../../services/language.service";
import { Language } from 'src/app/models/language';
import {CategoryTranslation} from "../../models/categoryTranslation";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  isAdded: boolean = false;
  isNotAdded: boolean = false;
  formError: boolean = false;
  message: string;

  imageFormProduct: FormGroup;
  productAddForm : FormGroup;
  formForNames: FormGroup;

  categories:CategoryTranslation[];
  category:CategoryTranslation;

  products:Product[];
  product:Product;

  languages:Language[];
  language:Language;

  imageList: FileList[];
  sameProductId: number;

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private categoryService:CategoryService,
    private languageService:LanguageService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getLanguages()
    this.getProducts()

    this.productAddForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      sameProductId: new FormControl(null, Validators.required),
      colorName: new FormControl(null, Validators.required),
      brandName: new FormControl(null, Validators.required),
      unitPrice: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      languageId: new FormControl(null, Validators.required)
   })

    this.imageFormProduct = new FormGroup({
      image: new FormControl(null),
      fileSource: new FormControl(null),
    });

   this.formForNames = new FormGroup({
     sameProductName: new FormControl(null,Validators.required),
     categoryName: new FormControl(null,Validators.required),
     languageName: new FormControl(null,Validators.required),
   })
  }

  onFileChange(e :any){
    this.imageList = e.target.files;
  }

  onProductChange(e :any){
    this.sameProductId = e.target.id;
  }

  getProducts(){
    this.productService.getProductByLanguage(1).subscribe((response) => {
        this.products = response.data
    })
  }

  getProductByName(e: any){
    this.products.forEach(product => {
      if(product.name == e.target.value){
        this.sameProductId = product.id
      }
    })
  }

  getLanguages(){
    this.languageService.getLanguages().subscribe(response => {
      this.languages = response.data
      this.language = this.languages[0]
      this.getCategories(this.language.id)
    })
  }

  getLanguagesName(e: any){
    this.languages.forEach((element) =>{
      if(element.name == e.target.value){
        this.language = element
        this.getCategories(element.id)
      }
    })
    // $("#my-button").hide()
  }

  getCategories(languageId:number){
    this.categoryService.getAllCategoryByLangId(languageId).subscribe(response => {
      this.categories = response.data
    })
  }

  getCategoryByName(e: any){
    this.categories.forEach((element) =>{
      if(element.name == e.target.value){
        this.category = element
      }
    })
  }

  productAdd(){
    if(this.category){
      if(this.language.id == 1)
      {
        this.productAddForm.patchValue({
          categoryId:this.category.categoryId,
          languageId:this.language.id,
        })
        console.log("elma")
      }
      else{
        this.productAddForm.patchValue({
          categoryId:this.category.categoryId,
          languageId:this.language.id,
          sameProductId:this.sameProductId
        })
        console.log("armut")
      }

      if(this.productAddForm.valid && this.formForNames.valid){
        console.log("armut",this.productAddForm.value)
        this.productService.productAdd(this.productAddForm.value).subscribe((response) =>{
        this.isAdded = true;
        this.message = response.message;
        this.product = response.data;
        this.toastrService.success(this.message);

        if(this.language.id == 1){
          for(let i =0; i<this.imageList.length; i++){
            this.imageFormProduct.patchValue({
              fileSource: this.imageList[i],
            });
            this.productService.uploadImage(this.imageFormProduct.value.fileSource,this.sameProductId).subscribe((response)=>{
              this.isAdded = true;
              this.message = response.message;
            });
          }
        }
        setTimeout(() => {
          this.isAdded = false;
          this.message = '';
          this.productAddForm.reset();
          this.formForNames.reset();
          this.imageFormProduct.reset();
        }, 3000);
        },(responseError) =>{
          console.log(responseError)
          if(responseError.error.Errors && responseError.error.Errors.length > 0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.isNotAdded = true;
              this.message = responseError.error.Errors[i].ErrorMessage
            }
          }
        })

      }else{
        this.formError = true;
        this.message = 'Hatalı Form!';
        this.toastrService.error(this.message)
        setTimeout(() =>{
          this.formError = false;
          this.message = "";
        },3000);
      }
    }else{
      this.formError = true;
      this.message = 'Hatalı Form!';
      this.toastrService.error(this.message)
      setTimeout(() =>{
        this.formError = false;
        this.message = "";
      },3000);
    }
  }

  /*productWithImageAdd(){
    if(this.category){
      this.productAddForm.patchValue({
        categoryId:this.category.id,
      })

      console.log("elma")
      if(this.productAddForm.valid && this.formForNames.valid && this.imageFormProduct.valid){

        this.productService.productWithImageAdd(this.productAddForm.value,this.imageFormProduct.value.fileSource).subscribe((response) =>{
          console.log("kiraz")
          this.isAdded = true;
          this.message = response.message;
          console.log(response)
          this.product = this.productAddForm.value
          setTimeout(() => {
            this.isAdded = false;
            this.message = '';
            this.productAddForm.reset();
            this.formForNames.reset();
            this.getCategories();
          }, 3000);
        },(responseError) =>{
          console.log(responseError)
          if(responseError.error.Errors && responseError.error.Errors.length > 0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.isNotAdded = true;
              this.message = responseError.error.Errors[i].ErrorMessage
            }
          }
        })

      }else{
        this.formError = true;
        this.message = 'Hatalı Form!';
        setTimeout(() =>{
          this.formError = false;
          this.message = "";
        },3000);
      }
    }else{
      this.formError = true;
      this.message = 'Hatalı Form!';
      setTimeout(() =>{
        this.formError = false;
        this.message = "";
      },3000);
    }
  }*/
}
