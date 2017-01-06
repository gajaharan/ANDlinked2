import {Component, Input, OnInit} from '@angular/core';
import {FileItem} from "../shared/directives/file-item";
import {UploadImagesService} from "../shared/services/upload-images.service";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  @Input() userId:string;

  isDropZoneOver:boolean = false;
  isEnabledUpload: boolean = true;
  isEditMode: boolean = false;
  files: Array<FileItem[]> = [];

  private NUMBER_OF_IMAGES: number = 10;
  sizeLimit = 2000000;
  images: any;

  constructor(private _uploadImagesService: UploadImagesService) {

  }

  ngOnInit() {
    this._uploadImagesService.listLastImages(this.NUMBER_OF_IMAGES, this.userId)
      .subscribe(
        images => this.images = images
      );
    //console.log(this.images[0]);
  }

  public fileOverDropZone(e:any):void {
    this.isDropZoneOver = e;
    this.uploadImagesToFirebase();
  }

  uploadImagesToFirebase() {
    this.isEnabledUpload = false;
    this._uploadImagesService.uploadImagesToFirebase(this.files, this.userId);
    this.isEditMode = false;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  clearFiles() {
    this.files = [];
    this.isEnabledUpload = true;
  }

}
