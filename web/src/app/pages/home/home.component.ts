import { Component, HostListener } from '@angular/core';
import { PublicService } from '../../services/public/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  home: any = null;
  homeImages: any[] = [];
  currentImageIndex: number = 0;


  private imageChangeInterval: any;

  imageLoaded: boolean = false;

  isDropdownOpen: boolean = false;

  works: any = null;
  worksLoaded: boolean = false;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.loadHome();
    this.loadWorks();
  }

  loadHome() {
    try {
      this.publicService.getHome().subscribe(

        (response: any) => {

          this.home = response.data.home;
          if (this.home && this.home.homeImages && this.home.homeImages.length > 0) {
            // Cargamos las homeImages
            this.homeImages = this.home.homeImages;

            // Creamos la url
            this.home.homeImages.forEach((homeImage: any) => {

              const img = this.imgConstructor(homeImage.image, "image/jpg")
              const imageUrl = URL.createObjectURL(img);

              homeImage.imageUrl = imageUrl;

            });
            this.imageLoaded = true;
            this.startImageRotation();

          }
        });

    } catch (error) {
      console.error('Error al obtener las imagenes', error);
    }
  }

  startImageRotation() {
    const timer = this.home.timer * 1000;
    this.imageChangeInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.homeImages.length;
    }, timer);
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  ngOnDestroy(): void {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadWorks(): void {
    try {
      this.publicService.getWorks().subscribe(

        (response: any) => {

          this.works = response.data.works;

          if (this.works) {

            // Creamos la url
            this.works.forEach((work: any) => {
              const workImages = work.workImages;

              if (workImages.length > 0) {
                const binary = workImages[0].image.image;
                const img = this.imgConstructor(binary, "image/jpg")
                const imageUrl = URL.createObjectURL(img);

                work.mainImageUrl = imageUrl;
              }

            });
            this.worksLoaded = true;
            //this.startImageRotation();

          }
        });

    } catch (error) {
      console.error('Error al obtener las imagenes', error);
    }

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

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }


}
