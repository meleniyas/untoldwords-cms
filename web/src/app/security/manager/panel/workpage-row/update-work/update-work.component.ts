import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { WorkService } from '../../../../../services/work/work.service';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.html',
  styleUrl: './update-work.css',
})
export class UpdateWorkComponent {

  workId!: string | null;
  workName!: string | null;
  architects!: string | null;
  description!: string | null;

  constructor(
    private workService: WorkService,
    private toastr: ToastrService,
    private modalDelete: MdbModalRef<UpdateWorkComponent>,
  ) { }


  close() {
    this.modalDelete.close();
  }

  update() {
    if (this.workId) {
      console.log("aqui");
      this.workService.updateWork(this.workId, this.workName, this.architects, this.description).subscribe(
        (response: any) => {

          this.showSuccess('Trabajo actualizado con exito');
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
