import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-image-add',
  templateUrl: './product-image-add.component.html',
  styleUrls: ['./product-image-add.component.css']
})
export class ProductImageAddComponent implements OnInit {

  imageFormProduct: FormGroup;
  productId: number;

  isAdded: boolean = false;
  message: string;

  imageList: FileList[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['productId']) {
        this.setImagesFormProduct(params['productId']);
      }
    });
  }

  onFileChange(e :any){
    this.imageList = e.target.files;
  }

  setImagesFormProduct(productId:number){
    this.productId = productId;

    this.imageFormProduct = new FormGroup({
      productId: new FormControl(this.productId),
      image: new FormControl(null),
      fileSource: new FormControl(null),
    });
  }

  add(){
    for(let i =0; i<this.imageList.length; i++){
      this.imageFormProduct.patchValue({
        fileSource: this.imageList[i],
      });
      this.productService.uploadImage(this.imageFormProduct.value.fileSource,this.productId)
      .subscribe((response)=>{
        this.isAdded = true;
        console.log(response.message)
        this.message = response.message;
      });
    }
  }
}
