import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RepositoryService } from '../../../../services/repository/repository.service';


@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.html',
  styleUrl: './delete-image.css',
})
export class DeleteImageComponent {

  image!: string | null;

  constructor(
    private repositoryService: RepositoryService,
    private toastr: ToastrService,
    private modalDelete: MdbModalRef<DeleteImageComponent>,
  ) { }


  close() {
    this.modalDelete.close();
  }

  delete() {

    if (this.image !== null) {
      this.repositoryService.deleteImage(this.image).subscribe(
        (response: any) => {

          this.showSuccess('Image eliminada con exito');
          setTimeout(() => {
            this.repositoryService.redirectTo('manager/repository');
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
      this.showError('Ocurrió un error y no pudo eliminarse la imagen');
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
