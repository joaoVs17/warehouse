import { Directive, ElementRef, Inject, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, filter, fromEvent } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

  @Output() clickedOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(
      filter( (event) => {
        return !this.isInside(event.target as HTMLElement); 
      }
    )).subscribe( () => {
      this.clickedOutside.emit();
    })
  }

  ngOnDestroy(): void {
      this.documentClickSubscription?.unsubscribe();
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck);
  }



}
