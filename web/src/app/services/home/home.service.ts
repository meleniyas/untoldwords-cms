import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }


  getHome(): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    return this.http.get<any[]>(environment.url + 'api/private/home', { headers: headers, responseType: 'json' })

  }

  updateHomeOrder(imageOrder: any[]): Promise<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const body = {
      homeImages: imageOrder.map(image => ({
        homeImageId: image.id,
        position: image.position
      }))
    }

    return new Promise(() => {
      this.http.put(environment.url + 'api/private/home/order', body, { headers })
        .toPromise()

    })
  }

  updateHomeTimer(timer: number): Promise<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      timer: timer
    }

    return new Promise(() => {
      this.http.put(environment.url + 'api/private/home/timer', body, { headers })
        .toPromise()

    })
  }

  uploadImage(imageFile: File, imageName: string): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', imageName); // Agregar el nombre de la imagen al FormData

    return this.http.post<any>(environment.url + 'api/private/home/image', formData, { headers: headers, responseType: 'json' })

  }
  deleteHomeImage(homeImage: any): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      homeImageId: homeImage.id
    }

    return this.http.delete<any[]>(environment.url + 'api/private/home/' + homeImage.id, { headers })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])
    });
  }

}