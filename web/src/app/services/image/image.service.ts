import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  // PRIVATE //
  uploadImage(imageFile: File, imageName: string): Promise<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', imageName); // Agregar el nombre de la imagen al FormData

    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.url + 'api/private/image', formData, { headers: headers, responseType: 'json' })
        .toPromise().then((response: any) => {

          this.showSuccess('Imagen subida con éxito');
          resolve(response);
          setTimeout(() => {

            this.redirectTo('manager/panel');

          }, 1000);
        })
        .catch(error => {

          console.error('ERROR', error);

          // Interface for errors. Array made from keys that has string array.
          interface ErrorData {
            [field: string]: string[];
          }

          const errors: ErrorData = error.error.data;

          for (const field in errors) {

            const errorsArray = errors[field];

            for (const value of errorsArray) {
              let message = field + ': ' + value;
              this.showError(message);
            }
          }
          reject(error);

        });
    });

  }

  getRandomImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(environment.url + 'api/public/image/random', { responseType: 'json' })
        .toPromise()
        .then((response: any) => {
          if (response.data.image) {

            const img = this.imgConstructor(response.data.image, "image/jpg")
            const imageUrl = URL.createObjectURL(img);
            resolve(imageUrl);
          } else {
            reject('La respuesta no es un Blob válido.');
          }
        })
        .catch(error => {
          console.error('ERROR', error);
          reject(error);
        });
    });
  }

  getHomeImages(): Promise<string[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(environment.url + 'api/private/home', { headers: headers, responseType: 'json' })
        .toPromise()
        .then((response: any) => {

          if (response.data) {
            resolve(response.data.home.homeImages);
          } else {
            reject('Todo ha ido mal.');
          }
        })
        .catch(error => {
          console.error('ERROR', error);
          reject(error);
        });
    });
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




  // Utilities //
  showError(message: string) {
    this.toastr.error(message);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  imgConstructor(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])
    });
  }
}