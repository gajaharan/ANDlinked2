import {Directive, EventEmitter, ElementRef, HostListener, Input, Output} from '@angular/core';
import {FileItem} from './file-item';
import * as _ from 'lodash';

@Directive({
  selector: '[NgSelectFiles]'
})
export class NgSelectFilesDirective {

  @Input() public files: Array<FileItem> = [];
  @Output() public onUpload: EventEmitter<any> = new EventEmitter();
  @Output() public onFileSelect: EventEmitter<FileItem[]> = new EventEmitter<FileItem[]>();

  public constructor() {
  }

  @HostListener('change', ['$event'])
  public onChange(event: any): void {
    console.log('onchange')
    let transfer = this._getTransfer(event);
    if (!transfer) return;

    this._preventAndStop(event);
    this._addFiles(transfer.files);
    this.onUpload.emit(true);
    this.onFileSelect.emit(this.files);
  }


  private _getTransfer(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _preventAndStop(event: any): any {
    event.preventDefault();
    event.stopPropagation();
  }

  private _addFiles(files: FileList): void {
    _.each(files, (file) => {
      if (this._fileCanBeAdded(file)) this.files.push(new FileItem(file))
    });
  }

  private _fileCanBeAdded(file: File): boolean {
    return (!this._fileIsAlreadySelected(file) && this._fileTypeIsImage(file.type));
  }

  private _fileIsAlreadySelected(file:File):boolean {
    return _.filter(this.files, _.iteratee(['name', file.name])).length > 0;
  }

  private _fileTypeIsImage(fileType: string): boolean {
    return (fileType == '' ? false : fileType.startsWith('image'));
  }

}

