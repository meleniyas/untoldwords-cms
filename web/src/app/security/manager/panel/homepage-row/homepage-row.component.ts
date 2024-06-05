import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home/home.service';

@Component({
  selector: 'app-homepage-row',
  templateUrl: './homepage-row.component.html',
  styleUrl: './homepage-row.component.css'
})
export class HomepageRowComponent implements OnInit {

  home: any = null;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.loadHome();
  }

  loadHome() {
    try {
      this.homeService.getHome().subscribe(
        (response: any) => {

          this.home = response.data.home;
          console.log(this.home);
        },
        error => {
          console.error('Error al obtener las imágenes', error);
        }
      );

    } catch (error) {
      console.error('Error al obtener las imagenes', error);
    }
  }

}
