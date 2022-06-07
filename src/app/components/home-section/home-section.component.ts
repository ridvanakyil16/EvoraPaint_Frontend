import {Component, forwardRef, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {GlobalVariable} from "../../models/global";
import * as AOS from "aos";
import {CategoryTranslation} from "../../models/categoryTranslation";
import {LanguageService} from "../../services/language.service";


@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent implements OnInit {

  owlOptions_category: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 1500,
    margin: 0,
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      280: {
        items: 2
      },
      500: {
        items: 3
      },

      800: {

        items: 6
      },
      1000: {

        items: 8
      }
    }
  };

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

  owlOptions_sponsor: OwlOptions = {
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
      400: {
        items: 2
      },
      700: {
        items: 3
      },
      1000: {
        items: 5
      },
    }
  };

  apiUrl = GlobalVariable.BASE_URL
  products : Product[] = [];
  categories : CategoryTranslation[];
  currentProduct : Product;
  userIsAdmin : boolean;
  activeLanguage: object;
  [key: string]: any;
  data: {
    [key:string]: Product[]
  } = {}
  imgArray:string[];
  styles=[
    "grey",
    "red",
    "black",
    "orange"
  ]

  greenColor = 'green';
  redColor = 'red';
  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private authService: AuthService,
    private languageService: LanguageService,
    private router:Router,
  ) {
    this.imgArray= [
      'assets/IMAGES/product_img/img_10.png',
      'assets/IMAGES/product_img/img_11.png',
      'assets/IMAGES/product_img/img_12.png'
    ]
  }

  ngOnInit(): void {

    if(localStorage.getItem("langName")){
      this.languageService.setLanguageName(JSON.parse(String(localStorage.getItem("langName"))))
    }

    this.languageService.getLanguageName().subscribe((response) => {
      this.activeLanguage = response
      // @ts-ignore
      this.getAllCategoryByLangId(this.activeLanguage.id)
    })

    this.authService.getUserIsAdmin().subscribe((response) => {
      this.userIsAdmin = response;
    });
  }

  // getAllByLangId(langId:number){
  //   this.categoryService.getAllCategoryByLangId(langId).subscribe(response => {
  //     response.data.map(category => {
  //       this.productService.getProductByCategory(category.categoryId,langId).subscribe(response => {
  //         this.data[category.name] = response.data
  //       });
  //     })
  //   })
  // }

  getAllCategoryByLangId(langId:number){
    this.categoryService.getAllCategoryByLangId(langId).subscribe(response => {
      this.categories = response.data
      this.getAllProductByCategoryId(langId)
    })
  }

  getAllProductByCategoryId(langId:number){
    this.categories.forEach((category,idx) => {
      this.productService.getProductByCategory(category.categoryId,langId).subscribe(response => {
        this[category.name + idx] = response.data;
        this.products = response.data;
      });
    })
  }

  setCurrentProduct(product:Product){
    this.currentProduct = product;
    this.router.navigateByUrl("/product/" + product.id)
    window.scrollTo(0,0)
  }
}
