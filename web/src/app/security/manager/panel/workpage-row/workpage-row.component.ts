import { Component, ElementRef, Input } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteWorkComponent } from './delete-work/delete-work.component';
import { AddWorkComponent } from './add-work/add-work.component';
import { UpdateWorkComponent } from './update-work/update-work.component';
@Component({
  selector: 'app-workpage-row',
  templateUrl: './workpage-row.component.html',
  styleUrl: './workpage-row.component.css',
})
export class WorkpageRowComponent {
  @Input() work: any
  workId!: string;

  name!: string;

  modalDelete: MdbModalRef<DeleteWorkComponent> | null = null;
  modalUpdate: MdbModalRef<UpdateWorkComponent> | null = null;

  constructor(
    private modalService: MdbModalService
  ) { }


  ngOnInit() {
    this.name = this.work.name;
    this.workId = this.work.id;
  }


  showConfirmDelete(workId: string) {
    this.modalDelete = this.modalService.open(DeleteWorkComponent, {
      modalClass: 'modal-md modal-dialog-centered',
      data: { workId: workId, workName: this.work.name }
    });
  }

  showUpdateWork(workId: string) {
    console.log(this.work);
    this.modalUpdate = this.modalService.open(UpdateWorkComponent, {
      modalClass: 'modal-md modal-dialog-centered',
      data: {
        workId: workId,
        workName: this.work.name,
        architects: this.work.architects,
        description: this.work.description
      }
    });
  }

}
