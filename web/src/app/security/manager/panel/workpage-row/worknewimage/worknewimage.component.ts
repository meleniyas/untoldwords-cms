import { Component, Input } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HomeService } from '../../../../../services/home/home.service';
import { PostWorkImageComponent } from './post-work-image/post-work-image.component';


@Component({
  selector: 'app-worknewimage',
  templateUrl: './worknewimage.component.html',
  styleUrl: './worknewimage.component.css',
})
export class WorkNewImageComponent {

  @Input() workId!: string;

  modalRef: MdbModalRef<PostWorkImageComponent> | null = null;

  constructor(
    private modalService: MdbModalService
  ) { }


  openAddImg() {
    this.modalRef = this.modalService.open(PostWorkImageComponent, {
      modalClass: 'modal-md modal-dialog-centered',
      data: { workId: this.workId }
    });
  }

}
