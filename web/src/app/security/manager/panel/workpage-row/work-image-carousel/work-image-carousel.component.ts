import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { WorkService } from '../../../../../services/work/work.service';
import { NgFor, NgStyle } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { DeleteHomeImageComponent } from '../../homepage-row/home-image-carousel/delete-home-image/delete-home-image.component';
import { DeleteWorkImageComponent } from './delete-work-image/delete-work-image.component';


@Component({
  selector: 'app-work-image-carousel',
  templateUrl: './work-image-carousel.component.html',
  styleUrl: './work-image-carousel.component.css',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragPlaceholder, NgFor, NgStyle],
})
export class WorkImageCarouselComponent {

  @Input() work: any = {};
  workImages: any = [];
  imageLoaded: boolean = false;

  orderedImages: { id: string, position: number }[] = [];

  orderState: boolean = false;

  modalView: MdbModalRef<DeleteWorkImageComponent> | null = null;
  imageHovered: ElementRef | null = null;


  @ViewChild('container') container!: ElementRef;

  constructor(
    private workService: WorkService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.loadWorkImages();
  }

  // Home metodos
  updateOrderedImages() {
    console.log(this.work.id)

    this.orderedImages = this.workImages.map((image: { id: any; }, index: any) => ({ id: image.id, position: index }));
    console.log(this.orderedImages);

    this.workService.updateWorkImageOrder(this.orderedImages, this.work.id);
  }

  loadWorkImages() {
    this.workImages = this.work.workImages
    console.log(this.work);
    this.imageLoaded = true;

  }

  // Drag an Drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.workImages, event.previousIndex, event.currentIndex);
    this.updateOrderedImages();
  }

  showSelectionDiv(imageDiv: ElementRef): void {
    this.imageHovered = imageDiv;
  }

  hideSelectionDiv(imageDiv: ElementRef): void {
    if (this.imageHovered === imageDiv) {
      this.imageHovered = null;
    }
  }
  scrollLeft() {
    this.container.nativeElement.scrollLeft -= 500;
  }

  scrollRight() {
    this.container.nativeElement.scrollLeft += 500;
  }

  imageOrder() {
    this.orderState = !this.orderState
  }

  delete(image: any) {
    this.modalView = this.modalService.open(DeleteWorkImageComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        workImage: image
      }
    });
  }



}
