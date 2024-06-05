import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { WorkService } from '../../../../../services/work/work.service';

@Component({
  selector: 'app-delete-work',
  templateUrl: './delete-work.html',
  styleUrl: './delete-work.css',
})
export class DeleteWorkComponent {

  workId!: string | null;
  workName!: string | null;

  @ViewChild('fileUploader') fileUploader!: ElementRef<HTMLInputElement>;


  constructor(
    private workService: WorkService,
    private toastr: ToastrService,
    private modalDelete: MdbModalRef<DeleteWorkComponent>,
  ) { }


  close() {
    this.modalDelete.close();
  }

  delete() {
    if (this.workId !== null) {
      this.workService.deleteWork(this.workId).subscribe(
        (response: any) => {

          this.showSuccess('Trabajo eliminado con exito');
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
      this.showError('Ocurrió un error y no pudo eliminarse el trabajo');
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
