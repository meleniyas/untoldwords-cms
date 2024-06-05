import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WorkService } from '../../../services/work/work.service';

import { NgFor, NgStyle } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { AddWorkComponent } from './workpage-row/add-work/add-work.component';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent {

  works: any = null
  workHovered: ElementRef | null = null;
  orderState: boolean = false;

  orderedWorks: { id: string, position: number }[] = [];

  modalRef: MdbModalRef<AddWorkComponent> | null = null;

  constructor(
    private workService: WorkService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks() {
    try {
      this.workService.getWorks().subscribe(
        (response: any) => {

          this.works = response.data.works;
          try {
            this.works.forEach((work: any) => {
              work.workImages.forEach((workImage: any) => {

                const img = this.imgConstructor(workImage.image.image, "image/jpg")
                const imageUrl = URL.createObjectURL(img);

                workImage.imageUrl = imageUrl;
              });

            });


          } catch (error) {
            console.error('Error al obtener las imagenes', error);
          }
        },
        error => {
          console.error('Error al obtener las imágenes', error);
        }
      );

    } catch (error) {
      console.error('Error al obtener las imagenes', error);
    }
  }

  trackByFn(index: number, item: any): number {
    return index; // or item.id if each item has a unique identifier
  }


  // Drag an Drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.works, event.previousIndex, event.currentIndex);
    this.updateOrderedWorks();
  }

  showSelectionDiv(workDiv: ElementRef): void {
    this.workHovered = workDiv;
  }

  hideSelectionDiv(workDiv: ElementRef): void {
    if (this.workHovered === workDiv) {
      this.workHovered = null;
    }
  }

  // Work metodos
  updateOrderedWorks() {
    console.log(this.works.id)

    this.orderedWorks = this.works.map((work: { id: any; }, index: any) => ({ id: work.id, position: index }));
    console.log(this.orderedWorks);

    this.workService.updateWorkOrder(this.orderedWorks);
  }

  openAddWork() {
    this.modalRef = this.modalService.open(AddWorkComponent, {
      modalClass: 'modal-md modal-dialog-centered',
    });
  }

  // Util
  imgConstructor(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

}
