import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImgCompressionService {

  constructor(private imgCompress: NgxImageCompressService) { }

  async compressImage(file: File, ratio: number, quality: number, maxWidth: number, maxHeight: number, cb = (compressedImage: File) => {}, failed = (msg: string) => {}) {
    
    this.fileToBase64Parser(file, fileBase64 => {
      this.imgCompress.getOrientation(file).then(orientation => {
        if (typeof fileBase64 === 'string') {
          this.imgCompress.compressFile(
            fileBase64,
            orientation,
            ratio,
            quality,
            maxWidth,
            maxHeight
          )
          .then(compressedImage => {
            this.base64toFileParser(compressedImage, file.name, file.type, (n_file => {
              cb(n_file);
            }))
          })
        }
      })
    })

  }

  base64toFileParser(fileBase64: string, filename: string, type: string,cb = (file: File) => {}) {
    const imageData = fileBase64.split(',');
    const decodedData =  atob(imageData[1]);

    const uintArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      uintArray[i] = decodedData.charCodeAt(i);
    }

    const fileObj =  new File([uintArray], filename,{type: type});
    cb(fileObj);
  }

  fileToBase64Parser(file: File, cb = (fileBase64: string) => {}) {
    const reader = new FileReader();
    reader.onloadend = ()  => {
      const fileBase64 = reader.result;
      if (typeof fileBase64 === 'string') {
        cb(fileBase64);
      }
    } 
    reader.readAsDataURL(file);
  }


}
