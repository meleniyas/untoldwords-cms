import { Component, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WorkService } from '../../../../../../services/work/work.service';

@Component({
  selector: 'app-post-work-image',
  templateUrl: './post-work-image.html',
  styleUrl: './post-work-image.css',
})
export class PostWorkImageComponent {

  workId!: string | null;

  @ViewChild('fileUploader') fileUploader!: ElementRef<HTMLInputElement>;

  selectedFile: File | any;
  imageName: string = '';

  previewStyles: any = {};

  constructor(
    private workService: WorkService,
    private toastr: ToastrService,
    private modalUpload: MdbModalRef<PostWorkImageComponent>,
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
      this.workService.uploadImage(this.selectedFile, this.imageName, this.workId).subscribe(
        (response: any) => {

          this.showSuccess('Imagen subida con éxito');
          setTimeout(() => {
            this.workService.redirectTo('manager/panel');

          }, 1000);
        },
        error => {

          // Interface for errors. Array made from keys that has string array.
          interface ErrorData {
            [field: string]: string[];
          }

          const errors: ErrorData = error.error.data;

          for (const field in errors) {

            const errorsArray = errors[field];
            for (const value of errorsArray) {
              let message = field + ': ' + value;
              this.showError(message);
            }
          }
        }
      );

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
