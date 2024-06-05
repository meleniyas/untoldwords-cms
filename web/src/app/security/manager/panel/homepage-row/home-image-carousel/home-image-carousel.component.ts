import { Component, Input, ElementRef, ViewChild } from '@angular/core';
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
import { HomeService } from '../../../../../services/home/home.service';
import { DeleteHomeImageComponent } from './delete-home-image/delete-home-image.component';


@Component({
  selector: 'app-home-image-carousel',
  templateUrl: './home-image-carousel.component.html',
  styleUrl: './home-image-carousel.component.css',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragPlaceholder, NgFor, NgStyle],
})
export class HomeImageCarouselComponent {

  @Input() home: any = {};
  homeImages: any = [];
  imageLoaded: boolean = false;

  orderedImages: { id: string, position: number }[] = [];

  orderState: boolean = false;

  modalView: MdbModalRef<DeleteHomeImageComponent> | null = null;
  imageHovered: ElementRef | null = null;


  @ViewChild('container') container!: ElementRef;

  constructor(
    private homeService: HomeService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.loadHomeImages();
  }

  // Home metodos
  updateOrderedImages() {
    this.orderedImages = this.homeImages.map((image: { id: any; }, index: any) => ({ id: image.id, position: index }));
    this.homeService.updateHomeOrder(this.orderedImages);
  }

  loadHomeImages() {
    try {

      this.home.homeImages.forEach((homeImage: any) => {

        const img = this.imgConstructor(homeImage.image, "image/jpg")
        const imageUrl = URL.createObjectURL(img);

        homeImage.imageUrl = imageUrl;
        this.homeImages.push(homeImage);
      });
      this.imageLoaded = true;

    } catch (error) {
      console.error('Error al obtener las imagenes', error);
    }
  }

  // Drag an Drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.homeImages, event.previousIndex, event.currentIndex);
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
    this.modalView = this.modalService.open(DeleteHomeImageComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        homeImage: image
      }
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
