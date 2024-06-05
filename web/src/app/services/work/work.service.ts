import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }


  getWorks(): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    return this.http.get<any[]>(environment.url + 'api/private/work', { headers: headers, responseType: 'json' })

  }

  uploadImage(imageFile: File, imageName: string, id: any): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', imageName); // Agregar el nombre de la imagen al FormData

    return this.http.post<any>(environment.url + 'api/private/work/' + id + '/image', formData, { headers: headers, responseType: 'json' })

  }

  updateWorkImageOrder(imageOrder: any[], workId: any): Promise<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const body = {
      workImages: imageOrder.map(image => ({
        id: image.id,
        position: image.position
      }))
    }

    return new Promise(() => {
      this.http.put(environment.url + 'api/private/work/' + workId + '/image/order', body, { headers })
        .toPromise()

    })
  }

  updateWorkOrder(workOrder: any[]): Promise<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const body = {
      works: workOrder.map(work => ({
        id: work.id,
        position: work.position
      }))
    }

    return new Promise(() => {
      this.http.put(environment.url + 'api/private/work/order', body, { headers })
        .toPromise()

    })
  }

  deleteWork(workId: string): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.delete<any>(environment.url + 'api/private/work/' + workId, { headers: headers, responseType: 'json' })
  }

  addWork(workName: string | null, architects: string | null, description: string | null): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      name: workName,
      architects: architects,
      description: description
    }
    console.log(body);
    return this.http.post<any>(environment.url + 'api/private/work', body, { headers: headers, responseType: 'json' })
  }

  updateWork(workId: string, workName: string | null, architects: string | null, description: string | null): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      name: workName,
      architects: architects,
      description: description,
      status: 1
    }
    console.log(body);
    return this.http.put<any>(environment.url + 'api/private/work/' + workId, body, { headers: headers, responseType: 'json' })
  }

  deleteWorkImage(workImage: any): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.http.delete<any[]>(environment.url + 'api/private/work/image/' + workImage.id, { headers })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])
    });
  }

}