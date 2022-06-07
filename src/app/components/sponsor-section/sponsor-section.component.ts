import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-sponsor-section',
  templateUrl: './sponsor-section.component.html',
  styleUrls: ['./sponsor-section.component.css']
})
export class SponsorSectionComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
