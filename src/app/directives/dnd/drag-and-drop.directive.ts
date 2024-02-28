import { Directive, Host, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true
})
export class DragAndDropDirective {

  @HostBinding('class.fileover') fileOver: boolean = false;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('click', ['$event']) onClick(evt: InputEvent) {
    evt.preventDefault();
  }

  @HostListener('dragover', ['$event']) onDragOver(evt: InputEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('Drag Over');
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: InputEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) public ondrop(evt: InputEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer?.files;

    if (files?.length || 0 > 0) {
      console.log(`You dropped ${files?.length} files`);
      this.fileDropped.emit(files);
    }

  } 

}
