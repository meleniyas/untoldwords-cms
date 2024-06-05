import { Component, ElementRef, Input } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {

  @Input() works: any[] = [];

  currentWork: any = [];

  workLoaded: boolean = false;
  currentImageIndex: number = 0;
  currentTotal: number = 0;

  modal: any;
  modalContent: any;
  modalImg: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.works.forEach(work => work.loaded = false);
    console.log(this.works);
  }

  ngAfterViewInit(): void {
    this.modal = this.elementRef.nativeElement.querySelector('#myModal');
    this.modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
    //const images = this.elementRef.nativeElement.querySelectorAll('.img-gallery');
    this.modalImg = this.elementRef.nativeElement.querySelector("#img01");

    /*     images.forEach((image: any) => {
          image.addEventListener('click', () => {
            modal.classList.add("show");
            modalImg.src = image.src;
            modal.style.zIndex = "9999";
            modal.nextElementSibling.classList.add("filter");
          });
    
          modalContent.onclick = () => {
            modal.classList.remove("show");
            modal.nextElementSibling.classList.remove("filter");
          };
        }); */
  }


  showModal(work: any) {
    this.currentWork = work;
    this.currentTotal = work.workImages.length;
    this.modal.classList.add("show");
    this.modalImg.src = work.mainImageUrl;
    this.modal.style.zIndex = "20";
    this.modal.nextElementSibling.classList.add("filter");

  }

  closeModal() {
    this.currentImageIndex = 0;
    this.modal.classList.remove("show");
    this.modal.nextElementSibling.classList.remove("filter");
  }

  previous() {
    const workImages = this.currentWork.workImages;
    this.currentImageIndex = (this.currentImageIndex - 1 + workImages.length) % workImages.length;
    console.log(this.currentImageIndex);
    console.log(workImages[this.currentImageIndex]);

    const img = this.imgConstructor(workImages[this.currentImageIndex].image.image, "image/jpg")
    const imageUrl = URL.createObjectURL(img);
    this.modalImg.src = imageUrl;

  }

  next() {
    const workImages = this.currentWork.workImages;
    this.currentImageIndex = (this.currentImageIndex + 1) % workImages.length;
    console.log(this.currentImageIndex);
    console.log(workImages[this.currentImageIndex]);

    const img = this.imgConstructor(workImages[this.currentImageIndex].image.image, "image/jpg")
    const imageUrl = URL.createObjectURL(img);
    this.modalImg.src = imageUrl;
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
