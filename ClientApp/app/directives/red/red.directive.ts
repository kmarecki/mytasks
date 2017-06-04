import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[red]'
})
export class RedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = 'red';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
