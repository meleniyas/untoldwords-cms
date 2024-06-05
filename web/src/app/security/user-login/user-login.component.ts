import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {


  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,

  ) {

  }

  ngOnInit(): void {
    if (this.cookieService.check('token')) {
      // this.router.navigate(['userhome']);
    }

  }

  loginUser(form: NgForm) {
    let user = form.value;
    this.authService.loginUser(user)

  }

}
