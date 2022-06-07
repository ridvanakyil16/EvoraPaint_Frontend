import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {

  @Input() appColor:string;

  constructor(private el:ElementRef) { }

  ngOnInit(){
    this.el.nativeElement.style.backgroundColor = this.appColor;
  }

}
