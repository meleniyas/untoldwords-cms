import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HomeService } from '../../../../../../services/home/home.service';

@Component({
  selector: 'app-delete-home-image',
  templateUrl: './delete-home-image.html',
  styleUrl: './delete-home-image.css',
})
export class DeleteHomeImageComponent {

  homeImage!: string | null;
  workName!: string | null;

  @ViewChild('fileUploader') fileUploader!: ElementRef<HTMLInputElement>;


  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private modalDelete: MdbModalRef<DeleteHomeImageComponent>,
  ) { }


  close() {
    this.modalDelete.close();
  }

  delete() {
    console.log(this.homeImage)
    if (this.homeImage !== null) {
      this.homeService.deleteHomeImage(this.homeImage).subscribe(
        (response: any) => {

          this.showSuccess('Home Image desvinculada con exito');
          setTimeout(() => {
            this.homeService.redirectTo('manager/panel');
            this.close();

          }, 500);
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
      this.showError('Ocurrió un error y no pudo desvincularse la imagen de home');
    };
  }

  // Utilities //
  showError(message: string) {
    this.toastr.error(message);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

}
