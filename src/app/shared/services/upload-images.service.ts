import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FileItem } from '../directives/file-item';
import * as firebase from 'firebase';
import * as _ from 'lodash';

@Injectable()
export class UploadImagesService {

  private IMAGES_FOLDER: string = 'images';
  private userId: String;

  constructor(public _angularFire: AngularFire) { }

  listLastImages(numberOfImages: number, userId: string): FirebaseListObservable<any[]>{
    return this._angularFire.database.list(`/${this.IMAGES_FOLDER}/${userId}/`, {
      query: {
        limitToLast: numberOfImages
      }
    });
  }

  uploadImagesToFirebase(files: Array<FileItem[]>, userId: String) {
    let storageRef = firebase.storage().ref();
    this.userId = userId;

    _.each(files, (item:FileItem) => {
      var fileName = item.file.name;
      item.isUploading = true;
      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.IMAGES_FOLDER}`).child(`${this.userId}/${fileName}`).put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.saveImage({ name: fileName, url: item.url });
        }
      );

    });

  }

  private setFileName (fileName: string) {
    var ext = fileName.split('.').pop();
    return this.userId + '.' +ext;
  }

  private saveImage(image:any) {
    this._angularFire.database.list(`/${this.IMAGES_FOLDER}/${this.userId}/`).push(image);
  }

}
