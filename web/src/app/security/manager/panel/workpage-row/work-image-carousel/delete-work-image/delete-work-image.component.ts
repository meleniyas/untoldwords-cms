import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HomeService } from '../../../../../../services/home/home.service';
import { WorkService } from '../../../../../../services/work/work.service';

@Component({
  selector: 'app-delete-work-image',
  templateUrl: './delete-work-image.html',
  styleUrl: './delete-work-image.css',
})
export class DeleteWorkImageComponent {

  workImage!: string | null;
  workName!: string | null;

  @ViewChild('fileUploader') fileUploader!: ElementRef<HTMLInputElement>;


  constructor(
    private workService: WorkService,
    private toastr: ToastrService,
    private modalDelete: MdbModalRef<DeleteWorkImageComponent>,
  ) { }


  close() {
    this.modalDelete.close();
  }

  delete() {

    if (this.workImage !== null) {
      this.workService.deleteWorkImage(this.workImage).subscribe(
        (response: any) => {

          this.showSuccess('Work Image desvinculada con exito');
          setTimeout(() => {
            this.workService.redirectTo('manager/panel');
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
