import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe

  ) { }


  loginUser(body: any) {

    this.http.post(environment.url + 'api/public/user-login', body, { responseType: 'json' })
      .toPromise()
      .then((response: any) => {

        if (response && response.hasOwnProperty('data')) {

          this.cookieService.delete('token');
          this.cookieService.set('token', response.data.token, undefined, '/', 'localhost');

          this.storageData(response.data.user);

          const name = response.data.user.name;
          this.showSuccess('¡ Bienvenid@ ' + name + ' !');

          console.log(response);

          setTimeout(() => {

            this.router.navigate(['manager/board/panel']);

          }, 1000);

        }

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

      });
  }

  logOut() {
    try {

      sessionStorage.clear();
      this.cookieService.delete('token', '/', 'localhost');
      console.log(this.cookieService.getAll())
      this.showSuccess('Bye');

      setTimeout(() => {

        this.router.navigate(['login']);

      }, 500);

    } catch (error) {
      this.showError('Ocurrio un error inesperado')
    }

  }


  // Utilities //
  showError(message: string) {
    this.toastr.error(message);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  storageData(data: any) {
    sessionStorage.setItem("id", data.id);
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", data.email);
  }

}
