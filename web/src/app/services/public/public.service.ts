import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {

  }

  getHome(): Observable<any[]> {

    return this.http.get<any[]>(environment.url + 'api/public/home', { responseType: 'json' })

  }

  getWorks(): Observable<any[]> {

    return this.http.get<any[]>(environment.url + 'api/public/works', { responseType: 'json' })

  }
}
