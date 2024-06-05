import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageService } from '../../../../services/image/image.service';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  @ViewChild('fileUploader') fileUploader!: ElementRef<HTMLInputElement>;

  selectedFile: File | any;
  imageName: string = '';

  previewStyles: any = {};

  constructor(
    private imageService: ImageService,
    private toastr: ToastrService,
    private modalUpload: MdbModalRef<ImageUploadComponent>,
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const label = document.getElementById('customUploadLabel');
    if (label) {
      label.innerText = this.selectedFile.name;
    }
    this.preview();
  }

  clear() {
    this.selectedFile = null;
    const label = document.getElementById('customUploadLabel');
    if (label) {
      label.innerText = "Añadir Imagen";
    }
    this.fileUploader.nativeElement.value = '';
    this.preview();
  }

  preview() {
    if (this.selectedFile) {
      const imageUrl = URL.createObjectURL(this.selectedFile);
      this.previewStyles = { 'background-image': `url(${imageUrl})` };
    } else {
      this.previewStyles = {};
    }
  }

  submitForm() {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile, this.imageName).then(() => {
        this.modalUpload.close();
      })
    } else {
      this.showError('No se ha seleccionado ningún archivo.');
    }
  }

  // Utilities //
  showError(message: string) {
    this.toastr.error(message);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

}
