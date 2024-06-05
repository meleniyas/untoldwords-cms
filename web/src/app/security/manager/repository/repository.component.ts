import { Component, ElementRef } from '@angular/core';
import { RepositoryService } from '../../../services/repository/repository.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteImageComponent } from './delete-image/delete-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {

  images: any = null;
  imagesAssigned: any = [];
  imagesUnAssigned: any = [];

  modalDelete: MdbModalRef<DeleteImageComponent> | null = null;
  modalUpdate: MdbModalRef<UpdateImageComponent> | null = null;
  imageHovered: ElementRef | null = null;

  constructor(
    private repositoryService: RepositoryService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.loadImages();
    console.log(this.images);
  }

  loadImages() {
    try {
      this.repositoryService.getImages().subscribe(
        (response: any) => {

          this.images = response.data.images.images;

          this.images.forEach((image: any) => {

            const img = this.imgConstructor(image.image, "image/jpg")
            const imageUrl = URL.createObjectURL(img);

            image.imageUrl = imageUrl;

            if (image.works.length > 0 || image.homePosition !== null) {
              this.imagesAssigned.push(image)

            } else {
              this.imagesUnAssigned.push(image)
            }

          });

        }, error => {
          console.error('Error al obtener las imágenes', error);
        }
      );

    } catch (error) {
      console.error('Error al obtener las imagenes', error);
    }
  }

  showSelectionDiv(imageDiv: ElementRef): void {
    this.imageHovered = imageDiv;
  }

  hideSelectionDiv(imageDiv: ElementRef): void {
    if (this.imageHovered === imageDiv) {
      this.imageHovered = null;
    }
  }

  delete(image: any) {
    this.modalDelete = this.modalService.open(DeleteImageComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        image: image
      }
    });
  }

  update(image: any) {
    this.modalUpdate = this.modalService.open(UpdateImageComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        image: image
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
