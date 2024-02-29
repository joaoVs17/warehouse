import { Directive, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';


@Directive({
  selector: '[appCollapse]',
  standalone: true
})
export class CollapseDirective {

  @HostBinding('class.collapsed') collapsed: boolean = false;
  @Output() clicked = new EventEmitter<any>();


  constructor() { }

  @HostListener('click', ['$event']) onClick(e: InputEvent) {
    e.preventDefault();
    console.log('kk')
  }

}
