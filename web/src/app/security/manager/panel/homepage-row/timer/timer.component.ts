import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HomeService } from '../../../../../services/home/home.service';
import { PostHomeImageComponent } from './post-home-image/post-home-image.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  @Input() home: any = {};
  timer: number | any = null;


  modalRef: MdbModalRef<PostHomeImageComponent> | null = null;

  constructor(
    private homeService: HomeService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.timer = this.home.timer
  }

  setTimer(form: NgForm) {
    const timerValue = form.value.timer;
    this.timer = timerValue;
    this.homeService.updateHomeTimer(timerValue);

  }

  openAddImg() {
    this.modalRef = this.modalService.open(PostHomeImageComponent, {
      modalClass: 'modal-md modal-dialog-centered',
    });
  }

}
