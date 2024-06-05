import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }


  getImages(): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    return this.http.get<any[]>(environment.url + 'api/private/repository', { headers: headers, responseType: 'json' })

  }

  deleteImage(image: any): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    return this.http.delete<any[]>(environment.url + 'api/private/repository/' + image.id, { headers: headers, responseType: 'json' })

  }

  updateImage(image: any, home: boolean, works: any): Observable<any[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);

    const body = {
      name: image.name,
      isHome: home,
      works: works,
    }
    console.log(body);


    return this.http.put<any[]>(environment.url + 'api/private/repository/' + image.id, body, { headers: headers, responseType: 'json' })

  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])
    });
  }

}